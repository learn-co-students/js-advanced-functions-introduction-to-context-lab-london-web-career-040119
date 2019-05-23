// Your code here
const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => ({
  firstName,
  familyName,
  title,
  payPerHour,
  timeInEvents: [],
  timeOutEvents: [],
});

const createEmployees = empolyeeRecords => empolyeeRecords.map(createEmployeeRecord);

const createTimeInEvent = (employee, timeInRecord) => {
  const [date, hour] = timeInRecord.split(' ');
  return Object.assign(employee, {
    timeInEvents: [...employee.timeInEvents, {
      type: 'TimeIn',
      date,
      hour: parseInt(hour, 10),
    }],
  });
};

const createTimeOutEvent = (employee, timeOutRecord) => {
  const [date, hour] = timeOutRecord.split(' ');
  return Object.assign(employee, {
    timeOutEvents: [...employee.timeOutEvents, {
      type: 'TimeOut',
      date,
      hour: parseInt(hour, 10),
    }],
  });
};

const hoursWorkedOnDate = (employee, date) => {
  const inTime = employee.timeInEvents.find(event => event.date === date);
  const outTime = employee.timeOutEvents.find(event => event.date === date);
  return (outTime.hour - inTime.hour) / 100 || 0;
};

const wagesEarnedOnDate = (employee, date) => hoursWorkedOnDate(employee, date) * employee.payPerHour;

const allWagesFor = employee => employee.timeInEvents
  .map(tie => wagesEarnedOnDate(employee, tie.date))
  .reduce((total, wage) => total += wage, 0);

const calculatePayroll = employees => employees.map(e => allWagesFor(e))
  .reduce((total, wage) => total += wage, 0);

const createEmployeeRecords = records => records.map(record => createEmployeeRecord(record));

const findEmployeebyFirstName = (employees, firstName) => employees.find(e => e.firstName === firstName)
;