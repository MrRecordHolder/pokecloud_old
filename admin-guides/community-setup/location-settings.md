---
description: 'How to set a servers city, state and timezone.'
---

# Location Settings

The location of servers is needed for some features to work properly. Location settings are considered to be everything listed on this page. 

{% hint style="info" %}
Servers can search for locations another server has created however, they can NOT see what server created the data.
{% endhint %}

### City

**`REQUIRED`** A servers city is used to attach to newly created data automatically. This will be used for features such as nests and local events.

> _**This should be the actual full city name NOT the region area like "Atlanta"**_

{% tabs %}
{% tab title="Full Command" %}
```
$set-city <city name>
```
{% endtab %}

{% tab title="Alias" %}
```
$sc <city name>
```
{% endtab %}

{% tab title="Example" %}
```
$sc sandy springs
```
{% endtab %}
{% endtabs %}

### State

**`REQUIRED IN USA`** A servers state is used to attach to newly created data automatically. This will be used for features such as nests and local events.

> _**This should be the actual full state name NOT an abbreviation like "GA"**_

{% tabs %}
{% tab title="Full Command" %}
```
$set-state <state name>
```
{% endtab %}

{% tab title="Alias" %}
```text
$ss <state name>
```
{% endtab %}

{% tab title="Example" %}
```text
$ss georgia
```
{% endtab %}
{% endtabs %}

### Timezone

**`REQUIRED`** A servers timezone is used to attach to newly created data automatically. This will be used for features such as nests, migrations and local events. If a timezone is not set, servers will be defaulted to \(EST\) US Eastern Time Zone.

{% hint style="success" %}
**Timezone Arguments:  
  
`central` \| `eastern` \| `middle european` \| `mountain` \| `pacific`**
{% endhint %}

{% tabs %}
{% tab title="Full Command" %}
```
$set-timezone <timezone argument>
```
{% endtab %}

{% tab title="Alias" %}
```text
$stz <timezone argument>
```
{% endtab %}

{% tab title="Example" %}
```text
$stz eastern
```
{% endtab %}
{% endtabs %}


