# ML model connection workflow

## Load requests

1. Frontend send a first `load` request for Switzerland on the overall timeframe
    The `load` request gives the following : 
    1. The R0 timeserie cropped according to the timeframe
    2. The set of policies in place and their timeseries cropped according to the timeframe
    3. An `update` method that computes new values of R0 given new parameters <br>
        This latter is some kind of "instance" of the model on the overall timeframe for the selected country. This method has to be stored in the backend to be used later.

### Load request body

```
{
    "request": "load",
    
    "model-id": "hybrid",
  
    "country": "country",
        
    "time-frame": {
        "from": "12.02.2020",
        "until": "15.06.2020"
    }
}
```

### Load response body

```
{
    "r0": "[time-serie]",

    "policies": {
            "p1": "[time-serie]",
            "p2": "[time-serie]",
            "p3": "[time-serie]",
            "p4": "[time-serie]",
            "p5": "[time-serie]",
            "p6": "[time-serie]",
            "p7": "[time-serie]",
            "p8": "[time-serie]"
        },

    "update": "update function"
}
```

## Update requests

2. Frontend can send an `update` request when updating paramters to fetch new R0 values
    The `update` request gives the following :
    1. The R0 timeserie cropped according to the timeframe

### Update request body

```
{
    "request": "update",

    "country": "country", // for integrity
        
    "time-frame": {
        "from": "12.02.2020",
        "until": "15.06.2020"
    },
        
    "policies": {
        "p1": "[time-serie]",
        "p2": "[time-serie]",
        "p3": "[time-serie]",
        "p4": "[time-serie]",
        "p5": "[time-serie]",
        "p6": "[time-serie]",
        "p7": "[time-serie]",
        "p8": "[time-serie]"
    },

    "demographics": {
        "gdp": "val",
        "density": "val"
    }
}
```

### Update response body

```
{
    "r0": "[time-serie]",
}
```