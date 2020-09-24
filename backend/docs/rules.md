Structure requests should have to be processed in the backend.

```
{
    "model": {
        "id": "id",
        "function": "f(x)",
        "args": {
            "arg1": "val1",
            "arg2": "val2"
        }
    }
}
```

Where `id` can be one of the following: <br
* i don't know yet

`function` and `args`are simply the function you'd like to call on the required model with some given arguments. <br>

You should find documentation for every functions directly in the models files.
