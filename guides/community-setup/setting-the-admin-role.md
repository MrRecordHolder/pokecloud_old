---
description: How to set a servers admin role for usage of data changing commands.
---

# Admin Role

### Set Admin Role

{% hint style="danger" %}
#### PokeCloud requires an admin role to be set for Trainers to use it's core features.
{% endhint %}

**`REQUIRED`** The admin role is a critical key in PokeCloud. This role can be an existing or new role on your server. Having an admin role restricts the use of everyone having the ability to use data changing commands. Server owners and users with `ADMINISTRATOR` permissions can not by-pass this and are required to have this role.  
  
**This role should only be assigned to community leaders and/or verified helpers of the community. Spamming or false reports could lead to a ban from usage of this bot.**

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

### Grant Admin Role

Once the admin role has been assigned/created, be sure YOU have that role. As stated above, without it, you can **not** use commands to alter data or complete the rest of this guide.  
  
_If you don't have the role you set above, give it to yourself manually on Discord:`Discord -> Server Settings -> Members -> <your username> -> Edit Roles`_

{% hint style="info" %}
You can do this for each user you verify to use data changing commands. If you would rather use a command to grant each user the role or allow non `ADMINISTRATOR` users to grant the role, use the command below. _Be sure to grant them the role first!_
{% endhint %}

{% tabs %}
{% tab title="Full Command" %}
```text
$grant-admin-role @username
```
{% endtab %}

{% tab title="Alias" %}
```
$gar @username
```
{% endtab %}

{% tab title="Example" %}
```text
$gar @Username
```
{% endtab %}
{% endtabs %}

### 

