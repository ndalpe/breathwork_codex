import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import {
  Check,
  Menu as MenuIcon,
  Minus,
  Plus,
  Vibrate,
  VibrateOff,
  Volume2,
  VolumeX,
  X
} from "lucide-react";

const STORAGE_KEYS = {
  voice: "breathwork.voice",
  muted: "breathwork.muted",
  haptics: "breathwork.haptics"
};

const PHASES = [
  { key: "inhale", label: "Inhale" },
  { key: "hold", label: "Hold" },
  { key: "exhale", label: "Exhale" },
  { key: "hold", label: "Hold" }
];

const NUMBER_CLIPS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen",
  "nineteen", "twenty", "twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five",
  "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine", "thirty"
];

const CLIPS = {
  inhale: "inhale.mp3",
  hold: "hold.mp3",
  exhale: "exhale.mp3",
  ...Object.fromEntries(NUMBER_CLIPS.slice(1).map((name, index) => [String(index + 1), `${name}.mp3`]))
};

const PRESETS = [
  {
    name: "Box breathing",
    description: "Build steady focus with equal inhale, hold, exhale, and hold.",
    times: [4, 4, 4, 4]
  },
  {
    name: "4-7-8",
    description: "Downshift toward rest with a long hold and longer exhale.",
    times: [4, 7, 8, 0]
  },
  {
    name: "Coherent breathing",
    description: "Support calm regulation with a smooth five-second rhythm.",
    times: [5, 0, 5, 0]
  },
  {
    name: "Relaxing breath",
    description: "Release tension with a soft inhale and extended exhale.",
    times: [4, 0, 6, 0]
  },
  {
    name: "Triangle breathing",
    description: "Create a clear three-part rhythm without a final hold.",
    times: [4, 4, 4, 0]
  },
  {
    name: "Energizing breath",
    description: "Use a shorter, active rhythm for alertness and momentum.",
    times: [3, 0, 3, 0]
  }
];

const VOICES = {
  velvet: {
    name: "Velvet Guide",
    tone: "deep calm, grounding",
    feel: "like being wrapped in a soft blanket at dusk",
    best: "sleep, anxiety relief, long exhale work, theta states"
  },
  heart: {
    name: "Heart Companion",
    tone: "warm, human, gently uplifting",
    feel: "someone kind sitting next to you, breathing with you",
    best: "daily practice, emotional regulation, consistency"
  },
  light: {
    name: "Light Energizer",
    tone: "bright, alive, subtle joy",
    feel: "morning sunlight through a window",
    best: "energizing breathwork, Wim Hof style, activation"
  }
};

const focusRing = {
  outline: "3px solid",
  outlineColor: "pine.300",
  outlineOffset: "3px"
};

const controlStyles = {
  borderRadius: "8px",
  fontWeight: 700,
  minH: "44px",
  _focusVisible: focusRing
};

const clampTiming = value => {
  const number = Number.parseInt(String(value), 10);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(30, number));
};

const patternText = times => times.join("-");

const firstPlayablePhase = times => {
  const index = times.findIndex(seconds => seconds > 0);
  return index >= 0 ? index : 0;
};

const nextPlayablePhase = (times, currentPhase) => {
  for (let offset = 1; offset <= PHASES.length; offset += 1) {
    const nextPhase = (currentPhase + offset) % PHASES.length;
    if (times[nextPhase] > 0) {
      return {
        phaseIndex: nextPhase,
        completedCycle: nextPhase <= currentPhase
      };
    }
  }

  return {
    phaseIndex: firstPlayablePhase(times),
    completedCycle: true
  };
};

const formatDuration = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
};

const cueForDisplayedSecond = (times, phaseIndex, remaining) => {
  if (remaining < 1) return null;
  if (remaining === times[phaseIndex]) return PHASES[phaseIndex].key;
  return String(remaining);
};

export default function App() {
  const [pattern, setPattern] = useState(PRESETS[0]);
  const [selectedVoice, setSelectedVoice] = useState(() => localStorage.getItem(STORAGE_KEYS.voice) || "velvet");
  const [muted, setMuted] = useState(() => localStorage.getItem(STORAGE_KEYS.muted) === "true");
  const [hapticsEnabled, setHapticsEnabled] = useState(() => localStorage.getItem(STORAGE_KEYS.haptics) !== "false");
  const [activePanel, setActivePanel] = useState(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [customTimes, setCustomTimes] = useState([4, 4, 4, 0]);
  const [customErrors, setCustomErrors] = useState({ inhale: false, exhale: false });
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(firstPlayablePhase(PRESETS[0].times));
  const [remaining, setRemaining] = useState(PRESETS[0].times[firstPlayablePhase(PRESETS[0].times)]);
  const [duration, setDuration] = useState(0);
  const [completedBreaths, setCompletedBreaths] = useState(0);
  const audioRef = useRef({});
  const lastCueRef = useRef("");
  const phaseIndexRef = useRef(firstPlayablePhase(PRESETS[0].times));
  const sessionIdRef = useRef(0);
  const tickRef = useRef(null);

  const selectedPatternText = useMemo(() => patternText(pattern.times), [pattern]);
  const closePanels = useCallback(() => setActivePanel(null), []);

  const vibrate = useCallback(durationMs => {
    if (!hapticsEnabled || !navigator.vibrate) return;
    navigator.vibrate(durationMs);
  }, [hapticsEnabled]);

  const playCue = useCallback(cue => {
    if (muted) return false;
    const audio = audioRef.current[String(cue).toLowerCase()];
    if (!audio) return false;

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch(() => {});
      return true;
    } catch {
      return false;
    }
  }, [muted]);

  const resetSession = useCallback((nextPattern = pattern) => {
    const startPhase = firstPlayablePhase(nextPattern.times);
    sessionIdRef.current += 1;
    lastCueRef.current = "";
    Object.values(audioRef.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    setRunning(false);
    setPhaseIndex(startPhase);
    phaseIndexRef.current = startPhase;
    setRemaining(nextPattern.times[startPhase]);
    setDuration(0);
    setCompletedBreaths(0);
  }, [pattern]);

  const applyPattern = useCallback(nextPattern => {
    setPattern(nextPattern);
    setCustomTimes(nextPattern.times);
    setCustomErrors({ inhale: false, exhale: false });
    resetSession(nextPattern);
    closePanels();
  }, [closePanels, resetSession]);

  const startSession = () => {
    const startPhase = firstPlayablePhase(pattern.times);
    const startRemaining = pattern.times[startPhase];
    const nextSessionId = sessionIdRef.current + 1;
    const firstCue = cueForDisplayedSecond(pattern.times, startPhase, startRemaining);
    setActivePanel(null);
    setCustomOpen(false);
    setDuration(0);
    setCompletedBreaths(0);
    setPhaseIndex(startPhase);
    phaseIndexRef.current = startPhase;
    setRemaining(startRemaining);
    setRunning(true);
    sessionIdRef.current = nextSessionId;
    lastCueRef.current = "";

    if (firstCue) {
      const cueKey = `${nextSessionId}:${startPhase}:${startRemaining}:${firstCue}`;
      if (playCue(firstCue)) lastCueRef.current = cueKey;
    }
    vibrate(160);
  };

  const updateCustomTime = (index, value) => {
    setCustomTimes(current => current.map((seconds, currentIndex) => currentIndex === index ? clampTiming(value) : seconds));
    if (index === 0) setCustomErrors(current => ({ ...current, inhale: false }));
    if (index === 2) setCustomErrors(current => ({ ...current, exhale: false }));
  };

  const applyCustomPattern = () => {
    const nextTimes = customTimes.map(clampTiming);
    const nextErrors = { inhale: nextTimes[0] < 1, exhale: nextTimes[2] < 1 };
    setCustomErrors(nextErrors);
    if (nextErrors.inhale || nextErrors.exhale) return;

    applyPattern({
      name: "Custom breathing pattern",
      description: "Your custom rhythm.",
      times: nextTimes
    });
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.voice, selectedVoice);
    const loaded = {};

    Object.entries(CLIPS).forEach(([key, file]) => {
      const audio = new Audio(`./audio/${selectedVoice}/${file}`);
      audio.preload = "auto";
      audio.load();
      loaded[key] = audio;
    });
    audioRef.current = loaded;

    return () => {
      Object.values(loaded).forEach(audio => {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      });
    };
  }, [selectedVoice]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.muted, String(muted));
  }, [muted]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.haptics, String(hapticsEnabled));
  }, [hapticsEnabled]);

  useEffect(() => {
    if (!running) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
      return undefined;
    }

    tickRef.current = window.setInterval(() => {
      setDuration(seconds => seconds + 1);
      setRemaining(seconds => {
        if (seconds > 1) return seconds - 1;

        const next = nextPlayablePhase(pattern.times, phaseIndexRef.current);
        phaseIndexRef.current = next.phaseIndex;
        setPhaseIndex(next.phaseIndex);
        if (next.completedCycle) setCompletedBreaths(count => count + 1);
        return pattern.times[next.phaseIndex];
      });
    }, 1000);

    return () => {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    };
  }, [pattern.times, running]);

  useEffect(() => {
    if (!running || remaining < 1) return;

    const cue = cueForDisplayedSecond(pattern.times, phaseIndex, remaining);
    const cueKey = `${sessionIdRef.current}:${phaseIndex}:${remaining}:${cue}`;
    if (cue && lastCueRef.current !== cueKey) {
      if (playCue(cue)) lastCueRef.current = cueKey;
      vibrate(remaining === pattern.times[phaseIndex] ? 180 : 45);
    }
  }, [phaseIndex, pattern.times, playCue, remaining, running, vibrate]);

  return (
    <Box minH={running ? undefined : "100dvh"} h={running ? "100dvh" : undefined} overflow={running ? "hidden" : undefined} bg="pine.900" color="pine.100">
      <Flex
        direction="column"
        h={running ? "full" : undefined}
        minH={running ? undefined : "100dvh"}
        maxW="896px"
        mx="auto"
        py="12px"
        px="max(16px, env(safe-area-inset-left))"
        paddingRight="max(16px, env(safe-area-inset-right))"
      >
        <Header
          hapticsEnabled={hapticsEnabled}
          muted={muted}
          onMenu={() => setActivePanel("menu")}
          onToggleHaptics={() => setHapticsEnabled(current => !current)}
          onToggleMute={() => setMuted(current => !current)}
          running={running}
        />

        <BreathingCoach
          completedBreaths={completedBreaths}
          duration={duration}
          onStart={startSession}
          onStop={() => resetSession()}
          pattern={pattern}
          patternText={selectedPatternText}
          phaseLabel={PHASES[phaseIndex].label}
          remaining={remaining}
          running={running}
        />

        {!running && (
          <Stack align="stretch" gap="12px" mt="16px" pb="24px">
            <Button {...controlStyles} h="52px" bg="pine.300" color="pine.950" _hover={{ bg: "pine.100" }} onClick={() => setActivePanel("patterns")}>
              Breathing pattern library
            </Button>
            <CustomPattern
              customErrors={customErrors}
              customOpen={customOpen}
              customTimes={customTimes}
              onApply={applyCustomPattern}
              onToggle={() => setCustomOpen(current => !current)}
              onUpdate={updateCustomTime}
            />
          </Stack>
        )}
      </Flex>

      <FullscreenPanel isOpen={activePanel === "menu"} onClose={closePanels} title="Menu">
        <Stack align="stretch" gap="16px">
          <MenuCard
            description="Choose a predefined breathing pattern according to how you want to feel."
            onClick={() => setActivePanel("patterns")}
            title="Breathing patterns"
          />
          <MenuCard
            description="Select a voice for the spoken guidance."
            onClick={() => setActivePanel("voices")}
            title="Choose a voice"
          />
        </Stack>
      </FullscreenPanel>

      <FullscreenPanel isOpen={activePanel === "patterns"} onClose={closePanels} title="Breathing patterns">
        <Stack align="stretch" gap="12px">
          {PRESETS.map(preset => (
            <ChoiceCard
              key={preset.name}
              description={preset.description}
              meta={patternText(preset.times)}
              onClick={() => applyPattern(preset)}
              selected={preset.name === pattern.name && patternText(preset.times) === selectedPatternText}
              title={preset.name}
            />
          ))}
        </Stack>
      </FullscreenPanel>

      <FullscreenPanel isOpen={activePanel === "voices"} onClose={closePanels} title="Choose a voice">
        <Stack align="stretch" gap="12px">
          {Object.entries(VOICES).map(([key, voice]) => (
            <ChoiceCard
              key={key}
              description={`Feel: ${voice.feel}`}
              meta={`Best for: ${voice.best}`}
              onClick={() => {
                setSelectedVoice(key);
                closePanels();
              }}
              selected={selectedVoice === key}
              title={`${voice.name} (${voice.tone})`}
            />
          ))}
        </Stack>
      </FullscreenPanel>
    </Box>
  );
}

function Header({ hapticsEnabled, muted, onMenu, onToggleHaptics, onToggleMute, running }) {
  return (
    <Flex
      align="center"
      flexShrink={0}
      justify="space-between"
      position={running ? "static" : "sticky"}
      top="0"
      zIndex="20"
      bg="pine.900"
      pb="12px"
      pt={running ? 0 : "4px"}
    >
      <IconButton {...controlStyles} aria-label="Open menu" bg="pine.800" color="pine.100" onClick={onMenu}>
        <MenuIcon size={21} />
      </IconButton>
      <Text userSelect="none" fontSize="lg" fontWeight="800">Breathwork</Text>
      <HStack gap="8px">
        <IconButton {...controlStyles} aria-label={muted ? "Unmute voice guidance" : "Mute voice guidance"} bg="pine.800" color="pine.100" onClick={onToggleMute}>
          {muted ? <VolumeX size={21} /> : <Volume2 size={21} />}
        </IconButton>
        <IconButton {...controlStyles} aria-label={hapticsEnabled ? "Disable haptic feedback" : "Enable haptic feedback"} bg="pine.800" color="pine.100" onClick={onToggleHaptics}>
          {hapticsEnabled ? <Vibrate size={21} /> : <VibrateOff size={21} />}
        </IconButton>
      </HStack>
    </Flex>
  );
}

function BreathingCoach({ completedBreaths, duration, onStart, onStop, pattern, patternText: timing, phaseLabel, remaining, running }) {
  if (running) {
    return (
      <Grid aria-live="polite" flex="1" minH="0" gridTemplateRows="72px minmax(0, 1fr) 112px" borderRadius="8px" bg="pine.800" boxShadow="breath">
        <Flex align="center" px="16px" color="pine.300" justify="space-between">
          <Box fontVariantNumeric="tabular-nums">
            <Text fontSize="sm">Duration</Text>
            <Text color="pine.100" fontSize="xl" fontWeight="800">{formatDuration(duration)}</Text>
          </Box>
          <Box fontVariantNumeric="tabular-nums" textAlign="right">
            <Text fontSize="sm">Breaths</Text>
            <Text color="pine.100" fontSize="xl" fontWeight="800">{completedBreaths}</Text>
          </Box>
        </Flex>
        <Stack align="center" minH="0" justify="center" px="16px" pb="16px" textAlign="center" gap="8px">
          <Text color="pine.300" fontSize={{ base: "xl", md: "2xl" }} fontWeight="800" textTransform="uppercase">{phaseLabel}</Text>
          <Text fontSize="clamp(6rem, 31vw, 13rem)" fontWeight="900" lineHeight="0.85" fontVariantNumeric="tabular-nums">{remaining}</Text>
          <Text color="pine.300" fontSize={{ base: "lg", md: "xl" }}>{timing}</Text>
        </Stack>
        <Flex minH="96px" align="flex-end" px="16px" pb="calc(12px + env(safe-area-inset-bottom))">
          <Button {...controlStyles} h="56px" w="full" bg="ember" color="pine.950" _hover={{ opacity: 0.9 }} onClick={onStop}>Stop</Button>
        </Flex>
      </Grid>
    );
  }

  return (
    <Flex minH="42vh" flex="1" direction="column" align="center" justify="center" borderRadius="8px" bg="pine.800" p="24px" textAlign="center" boxShadow="breath">
      <Stack gap="16px" align="center">
        <Box>
          <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="900">{pattern.name}</Text>
          <Text color="pine.300" fontSize={{ base: "xl", md: "2xl" }} fontWeight="700" mt="4px">{timing}</Text>
        </Box>
        <Button {...controlStyles} h="56px" px="40px" bg="pine.300" color="pine.950" _hover={{ bg: "pine.100" }} onClick={onStart}>Start</Button>
      </Stack>
    </Flex>
  );
}

function CustomPattern({ customErrors, customOpen, customTimes, onApply, onToggle, onUpdate }) {
  const fields = [
    { index: 0, label: "Inhale", error: customErrors.inhale },
    { index: 1, label: "Hold after inhale", error: false },
    { index: 2, label: "Exhale", error: customErrors.exhale },
    { index: 3, label: "Hold after exhale", error: false }
  ];

  return (
    <Box borderRadius="8px" bg="pine.800" p="12px">
      <Button {...controlStyles} aria-expanded={customOpen} h="52px" w="full" bg="pine.700" color="pine.100" onClick={onToggle}>Custom breathing pattern</Button>
      {customOpen && (
        <Stack align="stretch" pt="16px" gap="16px">
          <Text fontSize="lg" fontWeight="800">Your breathing pattern</Text>
          <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap="12px">
            {fields.map(field => (
              <Box key={field.index} minW="0">
                <Text color="pine.300" fontSize="sm" mb="4px">{field.label}</Text>
                <HStack gap="4px">
                  <IconButton {...controlStyles} minW="40px" px="0" aria-label={`Subtract one second from ${field.label}`} bg="pine.700" color="pine.100" onClick={() => onUpdate(field.index, customTimes[field.index] - 1)}>
                    <Minus size={18} />
                  </IconButton>
                  <Input
                    aria-invalid={field.error}
                    aria-label={`${field.label} seconds`}
                    inputMode="numeric"
                    min="0"
                    minW="0"
                    type="number"
                    value={customTimes[field.index]}
                    onChange={event => onUpdate(field.index, event.target.value)}
                    h="44px"
                    borderRadius="8px"
                    borderColor={field.error ? "red.400" : "pine.500"}
                    bg="pine.950"
                    color="pine.100"
                    textAlign="center"
                    _focusVisible={focusRing}
                  />
                  <IconButton {...controlStyles} minW="40px" px="0" aria-label={`Add one second to ${field.label}`} bg="pine.700" color="pine.100" onClick={() => onUpdate(field.index, customTimes[field.index] + 1)}>
                    <Plus size={18} />
                  </IconButton>
                </HStack>
              </Box>
            ))}
          </Grid>
          {(customErrors.inhale || customErrors.exhale) && <Text color="red.200" fontSize="sm">Inhale and exhale must be at least 1 second.</Text>}
          <Button {...controlStyles} h="52px" w="full" bg="pine.300" color="pine.950" _hover={{ bg: "pine.100" }} onClick={onApply}>Use this custom pattern</Button>
        </Stack>
      )}
    </Box>
  );
}

function FullscreenPanel({ children, isOpen, onClose, title }) {
  const titleId = useId();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = event => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Box aria-labelledby={titleId} aria-modal="true" position="fixed" inset="0" zIndex="50" overflowY="auto" bg="pine.800" color="pine.100" role="dialog">
      <Box minH="100dvh" maxW="768px" mx="auto" py="16px" px="max(16px, env(safe-area-inset-left))" paddingRight="max(16px, env(safe-area-inset-right))">
        <Flex align="center" position="sticky" top="0" zIndex="10" bg="pine.800" pb="16px" justify="space-between">
          <Box w="44px" />
          <Text id={titleId} fontSize="2xl" fontWeight="900">{title}</Text>
          <IconButton ref={closeButtonRef} {...controlStyles} aria-label={`Close ${title}`} bg="pine.700" color="pine.100" onClick={onClose}>
            <X size={21} />
          </IconButton>
        </Flex>
        {children}
      </Box>
    </Box>
  );
}

function MenuCard({ description, onClick, title }) {
  return (
    <Button {...controlStyles} h="auto" justifyContent="flex-start" p="20px" textAlign="left" whiteSpace="normal" w="full" bg="pine.700" color="pine.100" onClick={onClick}>
      <Box>
        <Text fontWeight="900">{title}</Text>
        <Text fontSize="sm" fontWeight="500" mt="4px">{description}</Text>
      </Box>
    </Button>
  );
}

function ChoiceCard({ description, meta, onClick, selected, title }) {
  return (
    <Button
      {...controlStyles}
      aria-pressed={selected}
      h="auto"
      justifyContent="flex-start"
      p="20px"
      textAlign="left"
      whiteSpace="normal"
      w="full"
      bg={selected ? "pine.300" : "pine.700"}
      color={selected ? "pine.950" : "pine.100"}
      border="2px solid"
      borderColor={selected ? "pine.100" : "pine.600"}
      onClick={onClick}
    >
      <Box>
        <HStack gap="8px">
          {selected && <Check size={18} aria-hidden="true" />}
          <Text fontWeight="900">{title}</Text>
        </HStack>
        <Text fontSize="sm" fontWeight="600" mt="4px">{description}</Text>
        <Text fontSize="sm" fontWeight="800" mt="8px">{meta}</Text>
      </Box>
    </Button>
  );
}
