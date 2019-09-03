# Admin Commands

## $create-nest

Creates a new public nest that only this community can update/report.

{% hint style="info" %}
The amount of pokestops, gyms and spawns can optionally be provided after the nest name by separating each with a comma. A **?** can be used for any optional input.
{% endhint %}

{% tabs %}
{% tab title="Full Usage" %}
```text
$create-nest <nest name>, [pokestops], [gyms], [spawns]
```
{% endtab %}

{% tab title="Alias Usage" %}
```text
$cn <nest name>, [pokestops], [gyms], [spawns]
```
{% endtab %}

{% tab title="Example" %}
```text
$cn hilton park, 5, ?, 7
```

Creates a nest called **Hilton Park** with **5 pokestops**, **? gyms** and **7 spawns per visit**.
{% endtab %}
{% endtabs %}

## $delete-nest



