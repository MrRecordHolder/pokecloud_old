---
description: How to set a servers admin role for usage of data changing commands.
---

# Admin Role

### Set Admin Role

{% hint style="danger" %}
#### PokeCloud requires an admin role to be set for Trainers to use it's core features.
{% endhint %}

**`REQUIRED`** The admin role is a critical key in PokeCloud. This role can be an existing or new role on your server. Having an admin role restricts the use of everyone having the ability to use data changing commands. Server owners and users with `ADMINISTRATOR` permissions can not by-pass this and are required to have this role.  
  
**This role should only be assigned to community leaders. Spamming or false reports could lead to a ban from usage of this bot.**

> _**The role name must be typed exactly how it is in your servers roles \(case sensitive\) without the @ symbol.**_

{% tabs %}
{% tab title="Full Command" %}
```text
$set-admin-role <Role name>
```
{% endtab %}

{% tab title="Alias" %}
```
$sar <Role name>
```
{% endtab %}

{% tab title="Example" %}
```text
$sar Admin Team
```
{% endtab %}
{% endtabs %}

### Set **Nest** Role

**`OPTIONAL`** The nest manager role allows community leaders to receive help reporting nests from users of their community.  
  
**This role should only be assigned to verified users of the community. Spamming or false reports could lead to a ban from usage of this bot.**

> _**The role name must be typed exactly how it is in your servers roles \(case sensitive\) without the @ symbol.**_

{% tabs %}
{% tab title="Full Command" %}
```text
$set-nest-role <Role name>
```
{% endtab %}

{% tab title="Alias" %}
```
$snr <Role name>
```
{% endtab %}

{% tab title="Example" %}
```text
$snr Nest reporter
```
{% endtab %}
{% endtabs %}

### Granting Roles

Once the roles has been assigned/created, be sure YOU have that role. As stated above, without it, you can **not** use commands to alter data or complete the rest of this guide.  
  
_If you don't have the role you set above, give it to yourself  and each user as it applies manually on Discord:  
  
`Discord -> Server Settings -> Members -> <your username> -> Edit Roles`_

{% hint style="danger" %}
Once the roles are granted, be sure to edit the PokeCloud channels to ensure the newly created roles are set with the correct `read` and `send` permissions.
{% endhint %}

