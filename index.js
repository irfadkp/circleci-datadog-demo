// Simple Node.js application for CircleCI demo
console.log('Hello from CircleCI + Datadog Integration Demo!');
console.log('Application started successfully');

// Simulate some work
setTimeout(() => {
  console.log('Application running...');
}, 1000);

setTimeout(() => {
  console.log('Application completed successfully');
  process.exit(0);
}, 2000);
