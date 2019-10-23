# workload-macro-planner

Quick tool comparing resources capacities and tasks workloads
for project macro plannings.
[Try it here](https://keiwen.github.io/workload-macro-planner/).

Designed as progressive web-app (PWA):
load demo's page with your smartphone browser,
you'll be able to install Workload Macro Planner as new app.

Working time report for this project: 25 h


## Doc

![Main page](https://raw.githubusercontent.com/Keiwen/workload-macro-planner/master/samples/small/main.png)

On mainpage, there is a list of project's tasks
with their workloads. Tasks can be moved up and down.
You can add task thanks to the "+" button (bottom-right corner).

Total workload is showed on top on the page,
compared to resources' capacity,
where excessive workload is in red.

Tasks can be sorted alphabetically or by workload.

Tasks can be switched off/on by clicking on its workload

![Card](https://raw.githubusercontent.com/Keiwen/workload-macro-planner/master/samples/small/card.png)

You can change the color of each task to categorize them if needed.

![Resources](https://raw.githubusercontent.com/Keiwen/workload-macro-planner/master/samples/small/resources.png)

From the bottom left of the main screen,
you can access to resources management,
where you can define capacities of your project.

![Projects](https://raw.githubusercontent.com/Keiwen/workload-macro-planner/master/samples/small/projects.png)

At bottom left of the main screen, you can click on your project name
to access the projects management, where you can manage multiple project.
Each project has its own resources and tasks.



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
