# Unibet App

A app which displays score and details of sports which are played or will be played.
Data are pulled from unibet.com

# Stacks

- React
- Dexie (IndexedDB)
- Flow Type

# Run

Goto public folder and run it as a root / of webapp

# Project Structure

modules and class are kept under folder by looking their responsibility

- api/ (for api routes and api calls)
- components/ (React components which are mostly independent of its surrounding/environment)
- core/ (core classes which deals with storages, fetching data and scheduling updates)
- tests/ (test cases of components and cores)
- types/ (type defination for flow)

# Performance optimization/ Error Logging and Improvments

- The carousel is highly customised and it renders only two `div`s due to which size of live events won't effect.
  It only request data of live event when has to be shown to the user. This helps becuase if we would render `n` items
  where `n` can be of 90 to100 then while changing state react had to render many dom again.

- We have used dependency inversion principle for storing data which helps us not directly relying on 3rd party code and
  in future if we have to change our 3rd party library then we can do it easily without effecting our other code because
  they depends on abstraction.

- `ScheduleRunner` is a class which runs on provided interval and it will execute task on scheduled time, it helps us controlling
  `setInterval`

- `flow` type to make code more static, readability and maintaianbility.
