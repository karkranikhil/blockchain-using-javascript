export function findMaxDate (allDates) {
    let maxDate = allDates[0]
    let maxDateObj = new Date(allDates[0])
    allDates.forEach(function (dt, index) {
      if (new Date(dt) > maxDateObj) {
        maxDate = dt
        maxDateObj = new Date(dt)
      }
    })
    return maxDate ? formatDDMMYYYY(maxDate) : ''
  }

  export function findMaxDate (allDates) {
    let maxDate = allDates[0]
    let maxDateObj = new Date(allDates[0])
    allDates.forEach(function (dt, index) {
      if (new Date(dt) > maxDateObj) {
        maxDate = dt
        maxDateObj = new Date(dt)
      }
    })
    return maxDate ? formatDDMMYYYY(maxDate) : ''
  }