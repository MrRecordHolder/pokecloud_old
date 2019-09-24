---
description: How to set all server location settings
---

# Location Settings

The location of servers is needed for some features to work properly. Location settings are considered to be everything listed on this page. 

{% hint style="info" %}
Servers can search for locations another server has created however, they can NOT see what server created the data.
{% endhint %}

### City

**`REQUIRED`** A servers city is used to attach to newly created data automatically. This will be used for features such as nests and local events.

> _**This should be the actual full city name NOT the region area such as the capital**_

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

### Region

A servers region is used to attach to newly created data automatically. This will be used for features such as nests and local events.

> _**This should be something like the state capital or area region**_

{% tabs %}
{% tab title="Full Command" %}
```
$set-region <region name>
```
{% endtab %}

{% tab title="Alias" %}
```
$sr <region name>
```
{% endtab %}

{% tab title="Example" %}
```
$sr atlanta
```
{% endtab %}
{% endtabs %}

### Country

A servers country is used to attach to newly created data automatically. This will be used for features such as nests and local events.

{% tabs %}
{% tab title="Full Command" %}
```
$set-country <Country name>
```
{% endtab %}

{% tab title="Alias" %}
```
$scountry <country name>
```
{% endtab %}

{% tab title="Example" %}
```
$scountry usa
```
{% endtab %}
{% endtabs %}

### Timezone

**`REQUIRED`** A servers timezone is used to attach to newly created data automatically. This will be used for features such as nests, migrations and local events.

{% hint style="success" %}
**US Time-zones  
`central` \| `eastern` \| `mountain` \| `pacific`**
{% endhint %}

{% hint style="success" %}
**UTC Time-zones  
`utc-3 | utc0` \| `utc1` \| `utc2` \| `utc3`\| `utc4`\| `utc5`**
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
#### US Example:

```text
$stz eastern
```

#### UTC Example:

```text
$stz utc-3
```
{% endtab %}
{% endtabs %}



