// Return an employee with attributes from the given array
const createEmployeeRecord = arr => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
const createEmployees = arr => {
    return arr.map(function(person){
        return createEmployeeRecord(person)
    })
}

// Given an employee and a date of work, update and return the employee record 
const createTimeInEvent = (employee, workDate) => {
    let [date, hour] = workDate.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

// Given an employee and a date of work, update and return the employee record
const createTimeOutEvent = (employee, workDate) => {
    let [date, hour] = workDate.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

// Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
const hoursWorkedOnDate = (employee, workDate) => {
    let start = employee.timeInEvents.find(event => event.date === workDate)
    let finish = employee.timeOutEvents.find(event => event.date === workDate)
    return (finish.hour - start.hour)/100
}

// Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
const wagesEarnedOnDate = (employee, workDate) => {
    let hours = hoursWorkedOnDate(employee, workDate)
    let hourlyRate = employee.payPerHour
    return hours * hourlyRate
}

// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. 
const allWagesFor = employee => {
    let allDatesWorked = employee.timeInEvents.map(e =>{ 
        return e.date
    })

    let totalPay = allDatesWorked.reduce(function(sum, date) {
        return sum + wagesEarnedOnDate(employee, date)
    }, 0)
    // The , 0 on line 68 essentially converts the function into dealing with numbers not dates
    return totalPay
}

// Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
const createEmployeeRecords = records => {
    return records.map(record => createEmployeeRecord(record));
}

// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
const calculatePayroll = array => {
    return array.reduce(function(sum, employee) {
        return sum + allWagesFor(employee)
    }, 0)
}

const findEmployeebyFirstName = (srcArray, firstName) => {
    return srcArray.find(person => person.firstName === firstName)
}
