Master Data & CRM KT (New Invite for Transcription)-20260610_140018UTC-Meeting Recording 

June 10, 2026, 2:00PM 

1h 1m 18s 

 
started transcription 

 
Da Costa, Vitor Hugo   0:07 
Hello, want to go? 

 
Contezini, Leonardo   0:07 
Paula Vida. 
On Jacob. 

 
Da Costa, Vitor Hugo   0:10 
The bank was in. 

 
Contezini, Leonardo   0:12 
Who said them? 

 
Da Costa, Vitor Hugo   0:16 
Device. 

 
Zhyrovetska, Khrystyna   0:25 
Hello! 

 
Contezini, Leonardo   0:26 
Hi, Khrystyna. 

 
Da Costa, Vitor Hugo   0:28 
Hi, Khrystyna. 

 
Imamura, Rodrigo Eiki   0:30 
Hello, morning everyone. 

 
Zhyrovetska, Khrystyna   1:07 
Okay, so Dustin did not respond to this invite, so I think we can start. 

 
Contezini, Leonardo   1:16 
Okay. 

 
Zhyrovetska, Khrystyna   1:17 
So. 
Today, we have a session on the master data and CRM knowledge transfer. 
As we previously talked through with Dustin, Phillip will continue handling the data warehouse for these projects, but the Quick Sense side will need to be transferred to your team. 
Um... 
by the end of June. So we are still working on this applications and Matthew will still continue working on them by the end of the months. But those are production apps and they have lots of logic. So we decided to start early with the knowledge transfer so that we could. 

 
Contezini, Leonardo   1:50 
Yeah. 

 
Zhyrovetska, Khrystyna   2:08 
Answer all your questions and. 
You could have some more time to... 
To get acquainted with the app. 

 
Contezini, Leonardo   2:25 
Okay. 

 
Zhyrovetska, Khrystyna   2:28 
This reply to Dustin. 
So, um, let me share my screen. 
So that's why I will focus more on the Qlik Sense side than Snowflake, but I will also show you how Snowflake looks like and what is the data model because you would need that understanding to develop the app in the future. So we'll start with the master data application. 
This application is already in production, but it's also being currently under development because we are introducing new features here. Generally, the aim of this application is to provide 
a way for Jacob and his team who are managing the master data to basically do some mappings for the sales. 
For example, like this product mapping. So in this table, we are taking all of the SAP products like this material codes. And Jacob and his team, they are assigning different product attributes according to which they want to see the analytics. 
So this application is essentially a bunch of write-back tables that allow users to map some values in the metric table or create new values in the configuration table. 
The main business stakeholder for this application is Jacob Weatherly and Dustin, I'd say, as well. But Jacob and his team are managing the app, so they are actually making the changes here. 
In the application, we have two types of tables, mapping tables and configuration tables. 
Um... 
Let's start with thematic ones. 
So each mapping table. 
It is built in a similar way. So we are bringing in some data. You can see those gray out fields. Those are fields that are read only. Users cannot edit them. 
And. 
This table is being updated once per day from SAP master material table. So we are bringing all of the material codes here. 
And every day we update it with the new material codes. 
I will share with you later the documentation because actually 
Many tables. 
have some filters. For example, this product table, we are not bringing all of the materials from SAP, but we are filtering them by these two filter types. So this product type part, it means that we are bringing on the finished product. 
products to the table because there are also some like test products in that table or some other types we don't need there. We need to bring the analytics on the unfinished goods. So that's the filter and then we want to filter. 
the materials only for the pilgrims company. So those are the company codes for that. 
for that filter. 
So each mapping table which have will have their filters according to which we filter out the data. But in general, like this is the list of the material codes. Each code has their description that we bring from SAP copper table. And also we bring this column last sale state. 
Because if, for example, for this product, if the last sale date was in 2024, maybe it's not really needed to map, or it's more important to map those products that are being currently sold, but... 
These ones, yeah, whenever Jacob and his team have time, they will update the other ones. 
So that's just for their reference. And then we have a bunch of columns with some product attributes. 
We build the tables in a way that users cannot just type anything in here, but they need to select a value from the drop-down list. And the drop-down list... 
takes the values from the configuration tables. For example, for the budget category column, in the configuration tab under product, there is budget category table. 
And we have a separate table for each of this column just so that we could create a list of values. So let's take a look at the budget category table. 
So if I'm a user and I see that, for example, there is in the dropdown, there is a budget category that's missing. So I need to go to this table and I can click add role and I can specify whatever I want a new name for the budget category and then I would need 
to hit the save button. I won't hit it because I'm actually starting production for you right now. So I click save changes and the system on the Snowflake side automatically generates the code. 
The code, each code has their pattern. For example, here we have BC because it's a budget category and we have 4 digits because there aren't that many budget categories. There are some other, for example, maybe for some accounts we may have more digits because 
There may be like thousands of accounts. 
So, users can create new. 
new list of values if they need to. They can edit its already existing descriptions. The ID won't change, but I can. 
edit the description or I can mark it for deletion. The important thing is that in this table, for example, we don't have anything deleted. We are just marking this items for deletion. So once you do it, you will still see this row. It's just the check mark. 
will be selected here. We won't actually delete it from the snowflake, but in snowflake we would have status not zero but one. And for example, in gold layer tables where we use this list of values, we will just filter out those 
that are active and those that are with status one, meaning they are marked for deletion, we won't take those into the golden layer tables. So it's important thing that we don't delete anything. 
From the master data, because many users have access to this app, and this is important data, so we keep it safe and we just mark it for the relation. 
And actually on the snowflake side, let me show you one of the tables. 
On the Snowflake side, all of the tables, all of the configuration tables, they have this prefix LOV, meaning list of value. 
And on Snowflake side, when we are writing back some changes from Qlik Sense to Snowflake, we always add these two columns, last update and updated by. So last update, it is just the time of the update. 
and updated by its either its mapping file, because for example, we loaded this list of budget categories from the mapping file, or it can be my name, my username in quick sense. So we can always know who introduced the change and when. 
And in the silver layer, you can see that it's the silver layer table. In the silver layer table, which is connected to Quick Sense, we're saving the whole history of updates. 
And let me show you, I don't know if we will have any updates on the budget category, so I'll take the product mapping table as an example. 
This is the table that I'll show to you how it looks like in Snowflix song. 
This material codes and product attributes. 
So, in Snowflake's side, it will look like this. So, first of all, for each description we are introducing the code, and... 
Let me find some example that's actually mapped. 
So the users on their side, they will just... 
Go to this FEC product category column and select text description from here. This text description will be written into Snowflake in this column. And then the ETL will look at the description of the value and find the code for it. 
from the LOV table. So this column, it's filled in by the ETL script in Snowflake. 
So, for each of the product descriptions, we have a call, and... 
Let me filter out just... 
One material code. 
To show you that we are saving all the history of the updates here, so... 
You can see that there are 8 records with the same material code. But why? Because users updated this value 7 times. Essentially, there should be just one. It should be a distinct list of material codes. So there should be just one row of. 
material codes. But in the silver layer, you're saving all of the history. 
So, if I go to this last update... 
Ormsby. 
Okay, awesome. 
material code, and then I just want to sort it, but my last sale date. 
So you could see that this value was introduced in February. 
And then it was being updated, and that's how you write, so we know that this user from click sense. 
Updated, and that's the update, and here we have all of the history, like... 
Ohh. 
Like, for example, here, like the user introduced the select quarter product type, because here it was unmapped, then user introduced it, and by ETL we introduced the code. 
Yes, do we have any questions? 

 
Da Costa, Vitor Hugo   16:17 
Yeah, Khrystyna, how much time it takes when a user adds a category, for instance, and this will show in the list of the table that you show, the main table. 
With the products in the all the columns, I don't know if you understood what I am talking about. 

 
Zhyrovetska, Khrystyna   16:43 
Yeah, it's... 
Maybe 30 seconds or so, I can show you on Da how it's happening. 
So in this script, Qlik Sense is writing back to Snowflake all of the changes. And then in the same script, Qlik Sense is reading. 
data from Snowflake back to introduce the changes on the UI. So for example, I'll take maybe like take the first material code and... 
I'll just update it. 
So, I complete those same changes. 
This group started again. 
The table has been already updated. You can see material code number one. I changed this column and I just want to show you in Snowflake. 
So this is today's date. Here we would see my name. 
And this is the new line item for that first material code where we would have a product. 
Process type, process type changed. 

 
Da Costa, Vitor Hugo   19:04 
And it's the same when I add a new budget category, for example. 

 
Zhyrovetska, Khrystyna   19:12 
Yes, if it's in you, you mean like if we go from unmapped to mapping something, it's the same process, same amount of time. 

 
Da Costa, Vitor Hugo   19:24 
Okay, I'm saying about in the configuration when you add a new value on this column. 

 
Zhyrovetska, Khrystyna   19:32 
Okay. 

 
Da Costa, Vitor Hugo   19:34 
It's the same thing. 

 
Zhyrovetska, Khrystyna   19:35 
Yeah, it's even faster, but essentially, yeah, I... 
Just add a new room here. 
Here's my value, and we have the ID already assigned to it. 
Usually users do lots of the update to run tables, so they can add like 10 project categories at a time, or when they do mappings, they can also map not just a single column, but all of the columns for lots of the material codes. 
So that's how usually users work with this. 
In each of the table, we also have some filters just to filter out the unmapped. If at least one value, one of this blue columns has unmapped, we consider it to be unmapped. So we show it here. And also this filter is 
basically just the filter by a last sale state. So if I want to see just products that are sold this year, I can set it up here. 
So this is the product mapping table. 
Then we have... 

 
Imamura, Rodrigo Eiki   21:53 
I have a question, Khrystyna. 

 
Zhyrovetska, Khrystyna   21:53 
A few tables. 
Yes, go on. 

 
Imamura, Rodrigo Eiki   21:58 
This new value you inserted in the configuration table now shows in the drop-down list of budget values. 

 
Contezini, Leonardo   22:05 
But. 

 
Zhyrovetska, Khrystyna   22:09 
Yes, that's right, because I added it specifically to appear in this drop-down list, so... 

 
Imamura, Rodrigo Eiki   22:18 
Yeah. 

 
Zhyrovetska, Khrystyna   22:27 
I remember how it called me. 
Turned. 
Yeah, this one. 

 
Imamura, Rodrigo Eiki   22:32 
K. 

 
Zhyrovetska, Khrystyna   22:36 
And here also the important thing is that... 

 
Imamura, Rodrigo Eiki   22:36 
Okay. 

 
Zhyrovetska, Khrystyna   22:42 
If I added some values in the configuration, so for example, if fresh small I added in the configuration table to fresh medium, everything that's already been mapped, it won't change. 
So the new value appears in the drop-down list, but all values are not being updated. That's the way how we discussed with the team how it should work. So essentially the users, once they added any names in the config tables, they need to. 
To go to the mapping table, for example, filter to... 
Fresh small. 
Done, update this list of phones, Mail. 

 
Contezini, Leonardo   23:33 
And what happens to these materials if you delete one of the categories? If you delete fresh, small, for example. 

 
Zhyrovetska, Khrystyna   23:45 
It would appear, it would be highlighted in the red frame, this value. It will still stay here. It will be highlighted. It's non-existent, but it will still stay. 

 
Contezini, Leonardo   24:01 
Okay. 

 
Zhyrovetska, Khrystyna   24:01 
Kary. 
Do one change. 

 
Da Costa, Vitor Hugo   24:30 
But if even if I deleted this status and it is highlighted in red how you said it will appear now and they are they will appear in Snowflake database. 

 
Zhyrovetska, Khrystyna   24:47 
Yes, because changes to this table. 
It does not input the mapping table what's already been mapped, because the person may delete something by mistake, and then if a mapping disappeared with, I don't know, 1000 of material codes being already mapped to it, of course we can restore it because we have all of the history in Snowflake. 
But. 
Have. 
That would take some time and it would be not the best case. So if we delete any values, this is basically the list of value table. So it impacts the list in the dropdown. 
We are not doing any updates to the mappings. 
I was just updating this list. 
For small, it seems like I even this one. 
Or are there any others? 
Okay, I don't know, maybe I'm mixing it, then maybe we have this functionality when the value does not exist in the LOV table. 
So sometimes users also provide us Excel spreadsheets with already the mapped values and we uploaded it to Snowflake. So there may be a situation where, for example, this fresh small budget category, it exists in the mapping, but it does not exist in the config table because we just loaded the mapping here. 
And we did not log any new budget categoristic config table. So in such cases, we mark it as red because it does not exist in the config table. Apparently, it was the deleted values. We do not highlight it. Maybe I was just confused. 
So. 
Yeah. 

 
Contezini, Leonardo   28:31 
Okay, so, so for example... 

 
Zhyrovetska, Khrystyna   28:32 
Do we have any other questions? 

 
Contezini, Leonardo   28:35 
Yes, please. So in the previous example. 
If you change the name of fresh small, for example, you, you like insert fresh small to. 
We won't have the fresh small register anymore. So in that case, should it appear in red? 
Or is it it just stays the same? 

 
Zhyrovetska, Khrystyna   28:59 
It stays the same. 

 
Contezini, Leonardo   29:04 
Okay. 

 
Zhyrovetska, Khrystyna   29:09 
Okay. 
Yeah, let's move over to the other table then. 
So the first one, it was related to the product mappings. And then we have 4 tables that are related to different sales types. So for example, this one, direct sales mapping, when we are talking about direct sales, we always mean SAP sales, some sales coming from the SAP data source. 
And this table, essentially to each sale record, we want to assign some new attributes like channel, sub-channel, and account types, corporate entity, redistributor, and distributor. 
Maybe let me switch to this diagram first. 
Um... 
Generally, for... 
the CRM project, we have three different data sources where we are taking historical sales. So the first data source is SAP, and here we have direct sales. The second data source is redistributor sales, and 
Third one is operator, or as we call it in Snowflake, indirect sales. So for each of these sale types, we have a separate table in the master data where we want to assign some additional attributes, like for example, channel. Is it export sale? Is it... 
I know food service or anything like this. 
And for you to understand what's their distributor sale, for example, let's talk also about account types. So from Pilgrims, 
If you, if you company types may buy products, so pilgrims may sell the product to red distributors. 
Why they are calling red distributors, not distributors? Because these red distributors, they further may sell the product to distributors. And distributors may sell their product to operators. So pilgrims may sell to red distributors. Pilgrims may sell directly to distributors. 
And it seems to me that builders is not selling directly to operators because operators buy a small amount of products. So operators buy mostly from distributors. 
And there is one more account type, which is corporate entity. Corporate entity, this is something that was like artificially created by our team to differentiate between different account types. So if we talk about distributors, 
There may be a distributor called Cisco, but Cisco may have a distributor in each of the US state. So there may be like Cisco Ohio, Cisco Colorado, Cisco Chicago, etc. And sometimes we want to see how many pounds of meat we sell to this distributor, to all of these distributors in 
All of the states, so we would create a corporate entity called Cisco, and Cisco will aggregate all of the sales from like 50 Cisco distributors in each of the state. So, corporate entity is this is not something that like pilgrims actually deal with; this is something that we like. 
Created to aggregate some distributors into one. 
Oh. 
So taking into account those different types of sales. Yes, Leonardo, do you have a question? 

 
Contezini, Leonardo   33:14 
Yes, just to give us an example, where should Kroger AccountsPayableDoNotUse, for example, fit into these account types? Are they distributors? 
Or none of them. 

 
Zhyrovetska, Khrystyna   33:28 
Honestly, don't know exactly. 
Yeah, Kroger is a distributor. You see that there is Kroger, Alaska, Cincinnati, blah, blah, blah. Let's see if Kroger is also here. Yes, and Kroger is also a corporate entity. 
Let's see if we have anything on the redistributor for Crocker. No. 

 
Contezini, Leonardo   33:53 
Okay. 

 
Zhyrovetska, Khrystyna   33:54 
So, Kroger is the distributor. 
Albertsons, which is how fun Albertsons Irvine distribution is 1 distributor, so most probably it would be distributor. 

 
Contezini, Leonardo   34:13 
Yeah, I think I got it. Maybe if they sell to the final consumer, they are distributors. So all of them fit into a distributor. 

 
Zhyrovetska, Khrystyna   34:25 
Mhm. 
Yep. 
So each of this sale type, operator sales, this table, it shows the sales of the distributors to operators. 
Redistributor sales, it's the sales of the redistributor to distributor. SAP direct sales. 
why it's calling direct because it's not sold through every distributor, but directly. So it's what Pilgrims sells to distributors directly. Maybe also to operators directly, but I think that operators are too small to work with Pilgrims. So Pilgrims always sells to distributors and distributors to operators. I'm not sure if Pilgrims sells. 
Anything directly to operators, but... 
This could be checked with Jacob later. 
So we have these three different data sources. 
And for each of these data sources, we want to have these attributes like channel or sub-channel, because then later in the analytics, for example, we want to group all of the sales from all of the different data sources. 
by channel, for example, to see how many pounds we sell via retail or export or food service, et cetera. 
And also to each of the sale record, we assigned account. Since those are the accounts that we specifically created for this project. And in Pilgrim's company, many people would still operate the ship too. 
AU. 
So, sheep 2 is also the client of the pilgrims. 
So many people would actually consider this column like ship to as the account as the client of the pilgrim, but for the CRM project. 
For the CRM analytics, we created different structure, the count types. I think Dustin and Jacob were. 
the initiators of this change. So they suggested to introduce this account types as they better fit the analytics. 
So that's why we assign accounts to each of the sale. And for example, in this direct sales mapping, we are taking the data from the SAP profitability analysis table, and we are using a composite key of material code plus ship to. 
plus payer plus profit center. And all of the distinct combinations of these four keys forms a list that you can see right now. And this is the huge list. It has like thousands of combinations, like almost 56 alternative combinations. 
All of these keys and filters and everything. 
It is described here in the documentation. And also we are filtering down this list by lots of filters like company codes or posting date or some profit centers. So this list of sales, it gets. 
It gets filtered down. 
So. 
This is the direct sales mapping. For each of these columns, we have a specific table in config. For a channel and sub-channel, we have this table. And channel and sub-channel, it's probably the only config table. 
that is structured differently because it has like this 4 columns and it has the connection between channel and sub-channel. So you could see that food service channel, it's been repeated 8 times because it has eight different sub-channels. So this is the only table where we create this link 
In channel and sub-channel, so we have one configuration table for both of these values. 
And the same functionality, users can edit any information here, they can add the roles or delete. 
And. 
This list of values they. 
If you're in the drop-down list here. 
Here in these two columns, and because we have this link. 
If I select Channel Export, 
Channel export has only one link to only one sub-channel export, so that's why we automatically set it for users. Food service would have lots of sub-channels, so we don't select it, but we filter down the list to those sub-channels that are linked to this channel. 
And... 
Yeah, retail also has multiple backed and Dileep, so it will show only two. 
This is the only two fields that have link between themselves. The authors are just created separately. So for each account we have. 
For account types, so we have corporate entity, we have red distributor, we have distributor, and... 
Yeah, we don't have any operators here. 
Because, yeah, Pilgrims does not sell directly to operators, so we are not mapping operators here. 
And let's take a look at this poly types. 
Because these tables actually have one specific, like, additional column apart from code and description, they also have a column type, because each of the columns, like this corporate entity, it can be further divided into... 
By corporate entity. 
I don't know, school, corporate entity, national accounts, etc. So it has an additional column that later is used in analytics. So we also can like filter down the analytics by these account types. 
And. 
For corporate entities, we don't have a lot of them. It's just 200. 
Um... 
So, I think most of them were created manually, but, for example, for distributors, we have... 
Thousands of distributors, so often the users. 
they have like such one list of 4000 distributors, they extract this data from Blacksmith or from other systems that they use and they ask us to import this CSV file directly into Snowflake. 
Because adding 4000 times, like clicking 4000 times, add row, and entering a description, like... 
Can very often make a mistake. 
So if we have lots of the data that needs to be entered into this table, we just log CSV files. But it just mainly happens at the beginning of the project, because later on, if they need to add like 10 more distributors, they just go to this table and add the data. 
those distributors. 
So. 
This is the direct sales mapping. Yeah, we also have lots of this grayed out columns. It just helps Jacob and his team to define like which channel or sub channel the sale should belong to. That's why we have like so many reference fields. 
Do we have any questions here? 

 
Contezini, Leonardo   43:13 
I do, please. 

 
Da Costa, Vitor Hugo   43:13 
I have one question. 

 
Contezini, Leonardo   43:16 
Go ahead, Vitor, please. 

 
Da Costa, Vitor Hugo   43:18 
Thanks. When we have an upload for this list that you show, when you upload the CSV, makes a reference for this list that you showed before. And the list on click is updated with the data from this CSV or not? 

 
Zhyrovetska, Khrystyna   43:40 
Yes, it is because. 
This application, it's updated once per day automatically. So it treats the data from all of the Snowflake tables that we are connected to, and it gets the most updated data because, for example, this list of direct sales mapping, it also gets updated from the SAP Copa. 
So, we need to bring in all of the new values every day, so the same happens with config tables. It's just we manually load since we there is no ETL that updates the table regularly, so... 
But the process on the side looks the same way. Every day at the specified time, we update, we reload the model of this application, and we bring all of the new data from Snowflake. 

 
Da Costa, Vitor Hugo   44:38 
Okay, thanks. 

 
Zhyrovetska, Khrystyna   44:39 
Like. 
This once per day, it's just the schedule of the update of this application, but also we can trigger the update manually. So I can. 
not introduce any changes and just click on the Save Changes button. And basically, the Save Changes button will then trigger the reload of the application. So if, for example, I asked to load the CSV file and I don't want to wait until tomorrow, I can just go here, click Save Changes, and the app 
will get reloaded. 
Are there any other questions? 

 
Contezini, Leonardo   45:26 
Yes, my question is not specifically related to the master data app, but I'm curious about the redistributor report because... 
They are similar to the store level data, in my opinion. They are sellout data, right? And Dustin included this report inside the historical sales data when we talked last week. So where does this data from the redistributor report come from? 

 
Zhyrovetska, Khrystyna   45:46 
Okay. 

 
Contezini, Leonardo   45:58 
Is it? It's not inside SAP, right? 

 
Zhyrovetska, Khrystyna   46:03 
Uh, actually it is. 
And. 
So our distributor data is already in Snowflake for us in this SAP Fivetran DB. So that's where we take the redistributor sales from. The IT team, Pilgrims IT team, they are using Fivetran to load this data for us from SAP. 

 
Contezini, Leonardo   46:29 
Yeah. 
And just to make sure, it reflects the sales from pilgrims to these redistributors or from the redistributors to the distributors or final consumers. 

 
Zhyrovetska, Khrystyna   46:50 
Mm. 
Ohh. 
We have those. 
Let me see, because it could it could be both. 
Let me check this more precise and I answer you, because... 
We are tracking both sales, what we sell to redistributors and what redistributors sell to distributors. But which data source is which, I just don't want to mix it. So let me check this. 

 
Contezini, Leonardo   48:25 
Okay. 
OK, thank you. Yeah, alright. Yeah, the reason is that... 

 
Zhyrovetska, Khrystyna   48:28 
But we are tracking both sides. 

 
Contezini, Leonardo   48:34 
In my mind, it makes sense that only the internal sales are inside the SAP, right? So the sales between pilgrims to the redistributors, but... 
Redistributors, 2 distributors. 
Should be in another source, an external source, maybe. That's why I'm asking. 

 
Zhyrovetska, Khrystyna   48:58 
Yeah, I see your logic. 

 
Contezini, Leonardo   49:01 
OK. 
Thank you, Khrystyna. 

 
Imamura, Rodrigo Eiki   49:06 
Christina, have a question. 

 
Zhyrovetska, Khrystyna   49:06 
Hi. 
Yes, come on. 

 
Imamura, Rodrigo Eiki   49:13 
Could you explain this trial diagram on the data flow where the data is being tested by? 
Livetran, and then where is the transformation Stephanie? 

 
Zhyrovetska, Khrystyna   49:33 
Yes, I will explain it, but I honestly wanted to do it in the another section, another session, because I can switch right now to this, but we will lose. 

 
Imamura, Rodrigo Eiki   49:38 
E. 
Okay. 

 
Zhyrovetska, Khrystyna   49:45 
the track of all of this sales. So I prepared this diagram specifically so that we would review in our knowledge transfer session. But let me first finish with all of this quick. 

 
Imamura, Rodrigo Eiki   49:54 
Mhm. 

 
Zhyrovetska, Khrystyna   49:58 
With the Quick Sun side, and then we switch to Snowflake. 

 
Imamura, Rodrigo Eiki   49:58 
Okay. 

 
Zhyrovetska, Khrystyna   50:05 
Okay, let's then move on because we just have 10 minutes and we have still 4 tables. So for redistributor sales, we actually have two table mappings. We have the first table mapping that's been done on the payer level. 
Okay, do you know what is the payer? Have you worked with this data before? 

 
Imamura, Rodrigo Eiki   50:33 
I don't think so. 

 
Zhyrovetska, Khrystyna   50:35 
Okay, so... 
In the SAP, there is a different account structure to what we use here. So in SAP, they don't have redistributors or corporate entities. In SAP, they have... 
Also, three account types: ship to, payer, and sold to. 
I don't know also a lot about this, but ship to, it seems to me that it's the most granular level. It's the lowest level of granularity of the accounts. And one payer can be linked to a few ship tos. So payer is like a higher level of granularity in terms of SAP accounts than ship to. 
And sold to, it seems that it's the higher level of payer, but I never worked with sold to. The 2 main account types that we worked is either payer or ship to. So that's how mainly sales team is viewing their analytics right now, either by payers or by ship tos. 
So that's why in the redistributor sales we have. 
two mappings, payers and registry, and sorry, payers, and the second mapping is done on the ship to level. It's not always one-to-one relation or one-to-many where one payer can have multiple ship tos. Also, one ship to can be linked to multiple. 
Who payers? 
There is, you know, don't ask why, I don't know, but there is a complicated structure. So we have a separate mapping on the payers and the separate mapping on the ship to level for distributor sales. 
So on the payer level, we have the payers, the distinct list of payers that are coming from this redistributor sales table. 
With their descriptions. 
And we are mapping redistributors and corporate entities to these players. 
Um... 
On the ship to level. 
We have a bit more complicated structure. 
So, on the ship to level, we have distinct list of ship tools with their ship to names, and we have corporate entity and... 
distributors, distributor accounts linked to these ones. 
And we have also some other values, like we have distributor type mapped here. We have buy-in groups. Those are just some other attributes by which the team wants to see analytics, like for example, to filter out all broadliners and to see their. 
Sales numbers. 
And also to each ship tool, we assign corporate account responsible and field sales responsible. So there is very unlogical thing, but two sales persons, two people. 
could be assigned to the same cell. 
So field sales responsible is always filled in. So each ship too has their field sales responsible. And field sales and corporate accounts, by the way, it's just the sub channels. So it's a different teams of salespeople. 
And field sales team. 
They are they are helping corporate account team to make sales, so, for example. 
Let's take this row #4 in this USF Island Foods Sheep Two, we will. 
Add their sales to Nick Svadely, salesperson, and to Donald Fitz salesperson. 
We don't know exactly who made this sale. Is it Nick or Donald? But field sales team is helping corporate accounts. So whenever there is a corporate account person responsible, there is always field sales responsible. So you can see that field sales are responsible column, it's always filled in. 
corporate account responsible, in some cases it could be unmapped. It means that just one person is responsible for this ship too. But for most of the ship twos, two people are responsible. So if later on in the analytics, I'll filter salesperson to Nick's Wavely. 
I will see the records with this sheep too. And if I filter to Donald fields, I will also see the same sales of this sheep too. It's just, yeah, one sale belongs to two people in this case. 
So that's why we assign people here on the ship to level, because of this peculiarity for all of the other account types, not redistributors, we assign salespeople in the territory matrix. But before I go to territory matrix, do we have any questions on the redistributors? 

 
Contezini, Leonardo   56:10 
No questions. 

 
Zhyrovetska, Khrystyna   56:12 
Okay, then let me just finish with operators. So we already covered direct sales, we already covered redistributors, and now we have operator sales. The third data source. Operator sales are also done on the ship to level, so we have ship to numbers here in descriptions. 
And for operators, we are assigning 3 column types, corporate entity, red distributor, and distributor. What's important is that red distributor and distributor cannot be assigned together to 1 SHC2. So you can see that, for example, here we assigned USF Phoenix as distributor, so red distributor is a name. 
And... 
If I go like this, redistributor ball. 
Then it's a red distributor, it's not a distributor sale. 
Ohh. 
But yeah, essentially it is very similar to redistributor mapping with the exclusion that we are not assigning any salespeople here. 
And very quickly, the last table, territory matrix. This table we use to assign a salesperson or salesperson manager to each sale for the direct sales and operator sales. Because for the redistributor sales, we already assigned people in its own mapping table. 
But we want to know who made a sale. Because sale team has their KPIs and each salesperson has their KPIs, yearly KPIs that they are tracking. So they want to know how many each salesperson made. 
fail this year. So we need to know to assign salesperson here and here as well. And for both of the tables, we use one mapping table called territory matrix. 
This territory matrix, it's the most complicated table because it's the only table, the only mapping table where we can add rows. So whenever I'm adding a new role, the system will generate ID automatically. So this ID, it's the. 
ID of the new line. This is not like ship to ID or anything like this. We create this ID on Snowflake side and this ID is ID for this role. 
And in this row, like we can specify the salesperson, operator state and territory name. But this is basically like the composite key for each salesperson, for each operator state and territory. We specify. 
Corporate entity, account, channel, sub-channel, and manager. 
Um... 
This is the most complicated table because yeah, we can create new roles here. We can also edit all of the information except for the ID that is read only. And we can also deactivate some roles. For example, if Taylor is not anymore working in the company. 
we will just deactivate this rows because we don't want to see analytics by Taylor. 
And we want to see the analytics by a new person, like the substitution from table, so we'll add new rows for that substitution. 
And we are using different keys, for example, from the operator table. 
Yeah, we use one type of keys to join to this table, and for direct sales mapping, it's the other type of keys. It's a bit complicated logic, so I will not explain it right now because we are out of time. But I will schedule for us the next session where I will explain to you how we join this direct sales mapping with the territory. 
matrix to get this salespeople. It's just, each sub-channel has their own logic, so you would need some more time for this. 
So that's it for now. I'll set up another session for us. And don't worry, you don't need to start working on this application right now because Janata is managing it by the end of the month. So you're just starting a set of meetings related to master. 
Yes. 
Pretty fantasy around. 

 
Contezini, Leonardo   1:01:07 
OK, thank you very much, Khrystyna. We will wait for the new inbox. 

 
Zhyrovetska, Khrystyna   1:01:12 
Yeah, I will send it out today. Thank you too for your time. Bye. 

 
Contezini, Leonardo   1:01:16 
Yeah. 
Bye bye, have a nice day. 

 
Imamura, Rodrigo Eiki   1:01:17 
Right, thank you. 

 
Da Costa, Vitor Hugo   1:01:18 
Thank you, bye-bye. 

 
Contezini, Leonardo stopped transcription 
