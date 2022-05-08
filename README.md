project build with node/express using typesript
this project use yarn instead of npm

the project is simple demo for query => xlsx file download

using the postgresql sample db
https://www.postgresqltutorial.com/postgresql-getting-started/postgresql-sample-database/

frontend:
- use material ui's datepicker to set to and from date
- button 'count' for the count query
- button 'download' for the xlsx file download

backend:
2 APIs:
- given a to and from date, count the number of records of a query
- given a to and from date, download the xlsx file of query result