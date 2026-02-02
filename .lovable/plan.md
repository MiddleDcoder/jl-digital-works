
# Cal.com Embed Integration Plan

## Overview
Replace the external Cal.com links with an embedded booking experience using the `@calcom/embed-react` package. This will keep users on your site instead of redirecting them to cal.com.

## Current State
There are 3 booking-related buttons across the site:
1. **Hero section** - "Book a Call" that scrolls to contact section
2. **FinalCTA section** - "Book a Call" that opens cal.com in new tab
3. **FAQ section** - "Book a Free Call" that opens cal.com in new tab

## Implementation Steps

### Step 1: Install the Cal.com Embed Package
Add `@calcom/embed-react` to the project dependencies.

### Step 2: Create a Reusable Cal.com Button Hook
Create a new file `src/hooks/useCalEmbed.ts` that:
- Imports `getCalApi` from `@calcom/embed-react`
- Initializes the Cal.com API with the "30min" namespace on mount
- Configures the UI with month view layout

### Step 3: Update FinalCTA Component
Replace the external link with a button that:
- Uses the Cal.com data attributes
- Triggers the embedded modal on click
- Maintains existing styling

### Step 4: Update FAQ Component  
Replace the external link with a styled button that:
- Uses Cal.com data attributes
- Opens the embedded booking modal
- Keeps the same visual appearance

### Step 5: Update Hero Component (Optional)
The Hero "Book a Call" currently scrolls to contact. You may want to:
- Keep it as-is (scrolls to FinalCTA where Cal.com embed is)
- Or convert it to directly open the Cal.com modal

---

## Technical Details

### New Hook: `src/hooks/useCalEmbed.ts`
```typescript
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export const useCalEmbed = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { 
        hideEventTypeDetails: false, 
        layout: "month_view" 
      });
    })();
  }, []);
};
```

### Button Data Attributes
All booking buttons will need these data attributes:
```jsx
data-cal-namespace="30min"
data-cal-link="jl-digital-works/30min"
data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
```

### Files to Modify
| File | Change |
|------|--------|
| `package.json` | Add `@calcom/embed-react` dependency |
| `src/hooks/useCalEmbed.ts` | New file - Cal.com initialization hook |
| `src/components/FinalCTA.tsx` | Convert `<a>` to `<button>` with Cal data attributes |
| `src/components/FAQ.tsx` | Convert `<a>` to `<button>` with Cal data attributes |
| `src/App.tsx` | Initialize Cal.com embed at app level |

## Benefits
- Users stay on your site during booking
- Faster booking experience (no page redirect)
- Better conversion tracking
- Consistent brand experience
