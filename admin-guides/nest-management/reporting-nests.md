---
description: >-
  How to report a Pokemon species nesting at a local park using the $report-nest
  command.
---

# Reporting Nests

Data used for nesting species is discovered by [The Sliph Road](https://thesilphroad.com/). No API usage is involved. This is data stored in PokeCloud by manual input.

### Requirements

* The nest must be created by the server reporting the nest
* User reporting must be a verified Trainer with the [admin](../community-setup/setting-the-admin-role.md) or [nest manager](../community-setup/setting-the-admin-role.md#set-nest-role) role.
* The Pokemon must by a valid nesting species:
  * [english](../../data-sets/pokemon/en.md)
  * [german](../../data-sets/pokemon/de.md) _\(beta\)_ 

{% tabs %}
{% tab title="Full Command" %}
```text
$report-nest <nest name>, <pokemon>
```
{% endtab %}

{% tab title="Alias" %}
```text
$rn <nest name>, pokemon
```
{% endtab %}

{% tab title="Example" %}
```text
$rn hilton park, pikachu
```
{% endtab %}
{% endtabs %}

This command updates the [listed nest](listing-nests.md) and the [data set](../../data-sets/defaultnest.js.md) for the nest.

### Unreported

If you accidentally report a species at the wrong nest you can change the nest back to "unreported" or "?" by using the following command.

```text
$rn hilton park, unreported | ?
```

