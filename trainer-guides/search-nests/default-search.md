---
description: >-
  How to search reported nests from the the servers state using the search-nests
  command.
---

# Default Search

By default, nest results are returned only if it has a [reported species](../../admin-guides/nest-management/reporting-nests.md) and if it is located in the same [state](../../admin-guides/community-setup/location-settings.md#state) as the current server. This allows Trainers to quickly search nests near-by.

{% tabs %}
{% tab title="Command" %}
```text
$search-nests <argument>, <your input>
```
{% endtab %}

{% tab title="Alias" %}
```text
$sn <argument>, <your input>
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
**Below are examples of how to default search using each argument**
{% endhint %}

### City

Returns all reported nests in the city of Alpharetta and state of Georgia \(or the active servers state\).

```text
$sn city, alpharetta
```

### State

Returns all reported nests in the state of Georgia.

```text
$sn state, georgia
```

### Pokemon

Returns all reported Pikachu nests in the state of Georgia \(or the active servers state\).

```text
$sn pokemon, pikachu
```

