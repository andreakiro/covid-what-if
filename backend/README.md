# Backend architecture

```
.
├── Pipfile
├── Pipfile.lock
├── README.md
├── api.py
├── data
│   └── merged_data
│       └── model_data_owid.csv
├── docs
│   ├── collaborators.png
│   ├── model-structure.pdf
│   ├── requests.json
│   ├── requests.md
│   ├── rules.md
│   ├── thesis.pdf
│   └── workflow.md
├── modeling
│   ├── LSTM.ipynb
│   ├── epi_config.yaml
│   ├── hybrid.py
│   ├── model_config.yaml
│   ├── model_data.py
│   ├── model_features.yaml
│   ├── models
│   │   ├── CHE
│   │   │   └── model.ckpt
│   │   ├── ITA
│   │   │   └── model.ckpt
│   │   ├── ...
│   │   │   └── model.ckpt
│   └── unified.py
└── utils
    ├── countries.py
    ├── covid_data_utils.py
    ├── oxford_policies.py
    └── policies.py
```