/**
 * Get color of seat based on price and state
 * 
 * @param surcharge Amount of money on top of the minimu price for the category
 * @param state 0 (free), 1 (booked), 2 (selected)
 * 
 * @return Color string variable, e.g. "red"
 */
export function getSeatColor(surcharge: number, state: number): string {
  switch (state) {
    case 0: {
      switch(surcharge) {
        case 0: return "orange"
        case 10: return "teal"
        case 20: return "green"
        case 30: return "red"
      }
    }
    case 1: return "grey"
    case 2: return "orange"
  }
}

/**
 * Get color of exercise group
 * 
 * @param exerciseGroupNr Number of exercise group
 * 
 * @returns Color as string
 */
export function getExerciseDotColor(exerciseGroupNr: number) {
  switch(exerciseGroupNr) {
    case 0: return "purple"
    case 1: return "orange"
    case 2: return "blue"
    case 3: return "pink"
  }
}