Structure requests should have to be processed in the backend.

```
{
    "model": {

        "id": "id",
        "function": "f(x)",
        "args": {

            "policies": {
                "p1 - school closing": "time-series",
                "p2 - workplace closing": "time-series",
                "p3 - cancel public events": "time-series",
                "p4 - gathering size restrictions": "time-series",
                "p5 - close public transport": "time-series",
                "p6 - home confinement orders": "time-series",
                "p7 - national movement restrictions": "time-series",
                "p8 - international travel restrictions": "time-series"
            },

            "demographics": {
                "gdp": "val",
                "density": "val"
            }

        }
    }
}
```

Where `id` can be one of the following: <br>
* Hybrid between long-short term memory and multi-layer perceptron models `ID = 1`

`function` is the function you'd like to call on the required model with some given arguments. <br>
You should find documentation for every functions directly in the models files.
