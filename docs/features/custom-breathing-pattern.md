# Custom Breathing Pattern

## Goal

Provide a simple widget to let the user to create a custom breathing pattern.

## Current Implementation
Each breathing pattern is defined with four timing values:
inhale - hold after inhale - exhale - hold after exhale

A value of 0 means that step is skipped.

### When no breathwork is running
When no breathwork is running, display a button labeled "Custom breathing pattern". Tapping on this button would expand the CBP widget.

### When a breathwork is running
Hide the CBP.

### When CBP is expanded
The widget should contain a text field to input the number of seconds for each breathing state (inhale - hold after inhale - exhale - hold after exhale). The widget's header should be labeled as "Your breathing pattern". The four text field should be displayed 2 by 2. Inhale and hold after inhale side by side, Exhale and hold after exhale side by side.
 - This field can only contain integer.
 - A plus and minus button should be added on the right of the text field to add a second or to substract a second.
 - It is also possible to type the number of second directly in the field.
 - The inhale and exhale field must be at least 1 second. If set to zero, the text field should have red border when clicking on the "Use this custom pattern" button.
Below those 4 fields, add a button to set the custom breathing pattern in the BC. The button should be labeled "Use this custom pattern" and span the entire length of the widget.