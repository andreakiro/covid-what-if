# Frontend architecture

```
.
├── README.md
├── node_modules
│   └── @dependencies.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── ressources
│   │   ├── corona-virus-ab.jpg
│   │   ├── delete-24px.svg
│   │   ├── plus_one-24px.svg
│   │   ├── undo-24px.svg
│   │   └── workflow-mark-on-dark.svg
│   └── robots.txt
├── src
│   ├── API.js
│   ├── App.js
│   ├── Utility.js
│   ├── components
│   │   ├── layout
│   │   │   ├── Footer.js
│   │   │   ├── Layout.js
│   │   │   └── Navbar.js
│   │   ├── modules
│   │   │   ├── Box.js
│   │   │   ├── DatePicker.js
│   │   │   ├── Dropdown.js
│   │   │   ├── Extra.js
│   │   │   ├── Modal.js
│   │   │   ├── SelectMenu.js
│   │   │   ├── Selector.js
│   │   │   └── Strenght.js
│   │   └── simulator
│   │       ├── Box.js
│   │       ├── Graph.js
│   │       ├── GraphManager.js
│   │       ├── Inputs.js
│   │       └── Policies.js
│   ├── index.css
│   ├── index.js
│   ├── pages
│   │   ├── Contribute.js
│   │   ├── Home.js
│   │   ├── Simulator.js
│   │   ├── SimulatorContainer.js
│   │   └── Team.js
│   ├── parameters
│   │   ├── BoxReducer.js
│   │   ├── ParameterProvider.js
│   │   ├── Reducer.js
│   │   ├── simulator
│   │   │   ├── BoxParameters.js
│   │   │   ├── InputsParameters.js
│   │   │   └── PoliciesParameters.js
│   │   └── util.js
│   ├── serviceWorker.js
│   ├── style
│   │   └── index.css
│   └── utilities
│       └── DateComparator.js
└── tailwind.js
```