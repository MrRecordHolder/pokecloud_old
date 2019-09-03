---
description: >-
  How to create a nest using the default and extend versions of the $create-nest
  command for faster data input.
---

# Creating A Nest

{% hint style="danger" %}
**Before continuing, ensure your server has completed the community setup guide.**
{% endhint %}

{% page-ref page="../community-setup/" %}

### Generated Directions

Upon creating a nest, directions are automatically generated using the nest name as well as the servers [**city**](https://pokecloud.gitbook.io/pokecloud/guides/community-setup/location-settings#city) ****and [**state**](https://pokecloud.gitbook.io/pokecloud/guides/community-setup/location-settings#state). This feature uses Google to automatically find the users location to provide faster and more accurate directions.

{% hint style="warning" %}
**PokeCloud does NOT read, store or share user locations in anyway.**
{% endhint %}

### Full Command

Only the nest name is required. Optionally, the amount of pokestops, gyms and spawns can be inputted by separating each with a comma. Don't worry, nest data can be updated at any time. Lets take a look at what the full command looks like as well as an example...

{% tabs %}
{% tab title="Full Command" %}
```text
$create-nest [pokestops], [gyms], [spawns]
```

_&lt; &gt; = required    \[ \] = optional_
{% endtab %}

{% tab title="Alias" %}
```
$cn [pokestops], [gyms], [spawns]
```

_&lt; &gt; = required    \[ \] = optional_
{% endtab %}

{% tab title="Example" %}
```text
$cn hilton park, 5, 3, 8
```

This creates a nest called **Hilton Park** with **5** pokestops, **3** gyms and **8** spawns.
{% endtab %}
{% endtabs %}

### Using Name Only

Creating a nest with just the name defaults all nest data to the unknown state of **?**.

```text
$cn hilton park
```

> _Creates a nest called **Hilton Park** with **?** pokestops, **?** gyms and **?** spawns._

### Skipping Inputs

Skipping inputs are also possible by using a **?** for the amount. This is only needed if the input after another input is being set _\(as shown below\)_.

```text
$cn hilton park, ?, 3
```

> _Creates a nest called **Hilton Park** with **?** pokestops, **3 gyms** and **?** spawns. Notice we left the spawn input blank to default it to **?**._

