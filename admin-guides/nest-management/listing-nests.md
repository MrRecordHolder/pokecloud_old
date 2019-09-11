---
description: >-
  How to utilize the #view-nests-here channel by displaying your community nests
  using the $list-nest and $list-all-nests commands.
---

# Listing Nests

The channel \#view-nests-here is automatically created upon inviting PokeCloud and set to your servers [**`nestChannel`**](../../data-sets/guildsettings.js.md). The bot was designed to display all nests created by this community in this channel. This helps raise community awareness about what and where nests are. However, there is some customization you can do.

{% hint style="info" %}
**There are 2 ways to list nests in your nest channel**
{% endhint %}

### 1. List All Nests

**Recommended**  
This command will list **ALL** nests created by the server in alphabetical order. Once all are listed, the migration details message will also be listed.

```text
$list-all-nests
```

### 2. Individual Listing

**Optional**  
__Individually listing nests gives servers flexibility on how to sort and display nests within the channel. 

{% tabs %}
{% tab title="Full Command" %}
```text
$list-nest <nest name>
```
{% endtab %}

{% tab title="Alias" %}
```text
$ln <nest name>
```
{% endtab %}

{% tab title="Example" %}
```text
$ln hilton park
```
{% endtab %}
{% endtabs %}

> _**Be sure to list the migration details message if you choose to lists nests one by one.**_

```text
$list-migration
```

