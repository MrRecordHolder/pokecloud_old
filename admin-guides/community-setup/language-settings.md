---
description: How to set the default language used for commands and responses by PokeCloud.
---

# Language Settings

A servers language by default is set to English. This can be changed to help alter commands and responses. For example, changing the language to `german` will allow the input of German Pokemon names when reporting a Pokemon at a nest. PokeCloud's response will also be in German.

> _This feature is still in early development. All responses in all commands may not be translated yet. Translations for responses are used by Google. Pokemon names are officially translated._

{% hint style="success" %}
**Language Arguments:  
  
`english` \| `german`**
{% endhint %}

{% tabs %}
{% tab title="Full Command" %}
```
$set-language <language argument>
```
{% endtab %}

{% tab title="Alias" %}
```text
$sl <language argument>
```
{% endtab %}

{% tab title="Example" %}
```text
$sl german
```
{% endtab %}
{% endtabs %}



