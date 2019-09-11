---
description: How to update nest data using the $update-nest command.
---

# Updating Nests

To ensure nest data accuracy, all information about a nest can be updated. Use the following command or alias along with a valid argument. See below for an example usage of each.

{% tabs %}
{% tab title="Full Command" %}
```text
$update-nest <nest name>, <argument>, <your input here>
```
{% endtab %}

{% tab title="Alias" %}
```text
$un <nest name>, <argument>, <your input here>
```
{% endtab %}
{% endtabs %}

{% hint style="success" %}
**Arguments:  
  
`pokestops` \| `gyms` \| `exgyms` \| `spawns` \|`city` \| `state` \| `google`**
{% endhint %}

### Pokestops

```text
$un hilton park, pokestops, 25
```

### Gyms

```text
$un hilton park, gyms, 10
```

### Ex Raid Eligible Gyms

_This is optional and will not display on a listed nest until the value is greater than 0._

```text
$un hilton park, exgyms, 3
```

### Spawns

```text
$un hilton park, spawns, 42
```

### City

```text
$un hilton park, city, alpharetta
```

### State

```text
$un hilton park, state, georgia
```

### Google \(Directions\)

```text
$un hilton park, google, 33.759244, -84.392628
```



