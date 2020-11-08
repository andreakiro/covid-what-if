# Requests architecture

`model-id` is just to identify which model to use. Useful if we create new models.

`args` contains all the input parameters for the request.

&nbsp;&nbsp;&nbsp; **`country`** speaks for itself

&nbsp;&nbsp;&nbsp; **`time-frame`** defines the bounds of the plot. Only need to compute prediction in this range.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **`from`** speaks for itself. Format can be modified. Inclusive. <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **`until`** speaks for itself. Format can be modified. Inclusive.

&nbsp;&nbsp;&nbsp; **`policies`** defines each policy level in a time serie.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **`p1`** time serie array. Format can be modified. <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **NB** : p1.length() == daysInInterval(until - from) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The first element in the time-serie will be the level for p1 on day `from`

&nbsp;&nbsp;&nbsp; `demographics` some other parameters that can be useful in the future. Optional.

```
{
    "model-id": "hybrid",

    "args": {    
        "country": "country",
        
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
}

```