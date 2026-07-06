Master Data & CRM KT pt.2 (New Invite for Transcription)-20260619_125723UTC-Meeting Recording 

June 19, 2026, 12:57PM 

1h 2m 48s 

 
started transcription 

 
Imamura, Rodrigo Eiki   3:00 
Morning. 

 
Contezini, Leonardo   3:01 
Hello, guys. Good morning. 

 
Da Costa, Vitor Hugo   3:03 
Good morning. 

 
Dickson, Dustin   3:06 
Morning. 

 
Contezini, Leonardo   3:32 
Dustin, are you going to watch any of the World Cup games? 

 
Dickson, Dustin   3:38 
No, I was on a plane with the guy who was going. He was sitting around the time and he was telling me all about it, but no, the tickets are expensive. 

 
Contezini, Leonardo   3:47 
Yeah, I read about it. 
Uh... 

 
Dickson, Dustin   3:50 
And. 

 
Contezini, Leonardo   3:51 
I think I read it was like around $1000, I don't know. 

 
Dickson, Dustin   3:54 
Yeah, this guy had said that he paid 600 and he was at the very top of the stadium. 

 
Contezini, Leonardo   4:01 
My God. 

 
Dickson, Dustin   4:03 
But I'm, you know, I don't know. I don't know much about soccer. I know it's a once in a lifetime event or, you know, chance probably, but. 

 
Contezini, Leonardo   4:09 
Yeah. 
Mhm. 

 
Dickson, Dustin   4:16 
I, I don't know anything about talking. 

 
Contezini, Leonardo   4:18 
Yeah, which sport do you like to watch? 

 
Dickson, Dustin   4:23 
American football, basketball, and baseball. 

 
Contezini, Leonardo   4:25 
Mm. 
That's this. 

 
Dickson, Dustin   4:35 
I like. 
Basketball A lot. 

 
Contezini, Leonardo   4:40 
Yeah, I don't know much about any of them. 

 
Dickson, Dustin   4:43 
Yeah, you know, you know about soccer though, right? 

 
Contezini, Leonardo   4:44 
Who? 
Not so much. I used it to, yeah, I used it to in the past. Now I've been just watching surfing events, actually. 

 
Dickson, Dustin   4:49 
No, really? 

 
Zhyrovetska, Khrystyna   5:00 
Hello, everyone. 
E. 

 
Contezini, Leonardo   5:03 
Like Christina. 

 
Dickson, Dustin   5:04 
Morning. 

 
Zhyrovetska, Khrystyna   5:10 
All right, so I can see that everyone's already here. This is our second or third session on master data. We already covered a click application, except for the territory matrix. 
that I want to maybe spend some more time on today. And also, we are going to review how the data flow is going in the Snowflake, even though Fellipe will still continue working on this project, but I believe even for the Qlik Sense developer. 
It's important to know how the data is flowing through all of the databases and the layers and which data sources to use. 
So, let me share my screen. 
We'll start with the territory matrix, because that's the last table that we didn't manage to finish last time. 

 
Dickson, Dustin   6:14 
I. 

 
Zhyrovetska, Khrystyna   6:19 
So this territory matrix, it's special, I would say, because it's the only mapping table that allows users to add some rows or delete them. 
By deleting, I mean deactivating the row. So by default, this is active column, everything is selected, but we can... 
Basically unselect these check boxes, which I won't do because I'm showing you the production. So I won't save the changes. But I can clear the check boxes and then these rows will not become active. These rows will still be present in the table. 

 
Dickson, Dustin   6:46 
S. 

 
Zhyrovetska, Khrystyna   7:05 
If I select this. 
Zero status that will show both. 
I don't think that in production we have some, it's a relatively new table, so we don't have lots of changes in the territory matrix. So I'm not really sure if we have any non-active. 
The Rose. 
Seems to me like everything is just acting. 
But the users can deactivate something if they want to. 
Yu. 
Yeah, in some cases, one, let's say some salesperson left the company. 
So the sale records should no longer be mapped to like this salesperson, but another one. We can either edit the salesperson because it's an editable field, or in some cases, if we need to deactivate the role, we can also do it. 
And in regards to creating the rows, so usually in... 
The mapping tables, we do not allow any rows. I'll show. 
remind you just the general structure of mapping table. So for example, for products, we don't have any buttons for creating or deleting anything. We just have a bunch of reference fields and a bunch of fields that are editable and. 
that are the ones that users need to map. And by map, I mean just select from the list of drop-downs. 
The character matrix is different. 
So in this territory matrix, actually, like it is updated. It can be updated by two ways. So the 1st way is that we are taking the distinct list of sales persons from operator. 
sales list that comes to us every Tuesday. So on the weekly basis, we receive an Excel file that is shared to us via email. We load this Excel file into Snowflake. This file goes through a number of different transformations. 
And in this file, it basically shows the operator sales and the sales people who are responsible for the sales. And basically, we are selecting the distinct list of the salesperson. And whenever there is a new name, we are adding a new role here with the salesperson name assigned to it. 
That's the first case, how this table can be updated. And the second case is span the user just clicks add new role, which is, I think, in 90%, the 2nd way is how the table is getting updated. 
because you can see like for one salesperson, you can have multiple rows and one salesperson may be responsible for different states and different territories. 
That's why people, that's why users can basically add as many rows for salespeople as they need to and specify like different states or territories and then map the fields as needed. 
Do you have any questions? I heard someone unmuted. 
Okay, then I'll continue. If you have any questions, just feel free to raise a hand or interrupt. 

 
Dickson, Dustin   11:01 
Hmm. 

 
Zhyrovetska, Khrystyna   11:08 
Um... 
Then the important thing is that the ID in this territory matrix, it's not linked to the salesperson, but every new created role is being assigned with the new ID. So on the Snowflake side, we're checking if... 
The role of information already has an ID, we of course do not regenerate it, we do not overwrite it, but if from Qlik Sense we're signing the role with the ID was missing ID, then we are triggering the job to generate this ID for territory matrix, so... 
Each new row in this table will get a different ID. 
Generally, in this table, you may see that only one field is. 
Read only field is like highlighted in Greg. All of the other fields are editable, but in this table we can center. 
These 3 fields to be like a composite key in the table, but the salesperson combination, state, and territory name. 
Um... 
Da. 
You won't. 
be any cases from business side where we would have like same salesperson, same state and some territory name duplicated and mapped to different channels. Because basically those are the three conditions based on which. 
The master data users are mapping channels, sub-channels, and manager. 
And corporate entity description, this is actually the newest field that we just added last week because for... 
Mm. 
For one of the sub-channels, which is called corporate accounts, we were using previously territory name and sub-channel to join this table to the SAP sales fact table to understand which sale record. 
is assigned to reach like salesperson or manager or channel here. But for corporate accounts, we couldn't use the territory name. We needed to use corporate entity description because the territory names should have been different. 
from the ones that we have in the SAP mapping tables. So the basically the link between the territory name keys, it was broken. So we needed to add one more column so that we could still join this table with a SAP table and 
assign those territory matrix attributes to the sales. I will explain it in more details when we will touch base on the CRM project. This is just for general understanding why we are having these columns in this table. 
Um... 
Yeah, here we have like filter for active, not active, and we have unmapped and all. We consider a row to be unmapped if even one of the attributes is marked as unmapped. If everything is mapped, then... 
We will filter it out in this tab. 
Um... 
And yeah, Users can also edit any of these fields that are. 
basically everything except for the first column. For most of these fields, we are taking values from the LOV or configuration tables for the drop-downs. So for example, for the territory name column, I have a drop-down with the values that are taken from. 
On the character configuration table, and on this character configuration table, it basically exists primarily for the reason of creating the. 
I, I. 
The conscriptions and the cost that are generated on the software side. 
So, um... 
You're using this list to provide it in the draw. 
Down, and always in all the. 
A balance, we're adding on the value that's on that, and by default, we set all of the values to unmapped. 
On developing a new table. 
The same thing with corporate entity channel, sub-channel, manager, and salesperson. All of these are drop-down lists from the respective configuration tables. And the only exception is operator state. Since operator state, it has 
All of the 50 states of the US and also some additional values like all states. And also today we are deploying one change that will bring an A value to this list. So that is the only list that we define on the Quick Sense site. 
On the Qlik Sense side, we have like a set values for this list. Users, Qlik Sense users do not have the ability to edit this list, but because this is the list of states that shouldn't change very often. 
We did not create any config table because. 
It just won't be needed a lot. And actually, this is the first time that we are making the changes. We are adding an A, like not applicable to this list. 
Yeah, no other changes. That's not no other foreseeable changes here. So that's the only list that's defined on the clicks inside. Everything else is pretty configurable. 
Do you have any questions on the territory matrix? 

 
Contezini, Leonardo   18:08 
I do have a question, Khrystyna. Who is responsible for fulfilling this information and how often they are doing it? 

 
Zhyrovetska, Khrystyna   18:18 
And Jacob and his team, Jacob finally, um... 
Jason, Amber, I think mainly these two people are mapping all of the tables in the mapping tab. And also recently we provided them access to config tab. So they are also adding the list of values in these tables. 
So this is the team within the digital transformation. 
Team and how often? 
I would say, like, daily. 

 
Contezini, Leonardo   19:01 
Okay. 

 
Zhyrovetska, Khrystyna   19:01 
Not every table is updated daily, but one, like, for example, this week we were focusing on the direct sales mapping. So we were constantly updating it. I think in the future, we will just update. 

 
Contezini, Leonardo   19:12 
Mhm. 

 
Zhyrovetska, Khrystyna   19:18 
Ohh. 
whenever new records come. So this table, like territory matrix, I don't think that it will be really updated very often, but maybe some other like direct sales mapping, it may be updated on the weekly basis or even on the daily basis. 

 
Contezini, Leonardo   19:31 
Mhm. 
Okay, I got it. 
Thank you. 

 
Zhyrovetska, Khrystyna   19:46 
All right, then let's move to the Snowflake side. And before I will show you the tables, I just want us all to align on the general structure. So 
I will be sharing these diagrams. 
Sai. 
So, yeah, let's start with this generally before, so for... 
All mapping tables, we are bringing some data from the fact data sources. Then from last time, you may remember that we have three main data sources for this RAM project, which is SAP Direct sales, redistributor sales, and operator sales. 
So from each of these fact tables, we are bringing some data to the sales master data management tables. For example, as I already told you in the territory matrix, we are taking distinct list of salespersons from 
Our operator, the fact table. 
In the direct sales mapping table. 
We're also bringing all of this data that's grayed out, all of these grayed out fields. We're bringing them from the SAP effect table. 
And we are updating it daily, and, for example... 
from the redistributor fact table, we are taking the distinct list of ship to and ship to names and we are basically updating these fields, these grayed out fields. So in each of the mapping table tables, we 
Basically, start from bringing the... 
Data from one of the three five data sources. 
And we do this update on the big level. 
The table where we are bringing these updates, the tables, they are located in the Pilgrims database, Data Governance Silver Scheme. 
Every table that exists in Qlik Sense in the master data application uses some table from the data current and silver layer. So we're connecting, this is probably one of the exceptions when we are using not the gold layer in Qlik Sense, but the silver layer tables. 
So all of these updates that users are making on the Click Sense side, yeah, this is basically, this is what I'm showing here. So from Click Sense side, everything that we are writing to Snowflake. 
It's entering the silver layer schema in Pilgrim's database, and also Qlik Sense is reading that data from the silver layer. 
You may notice that this Pilgrims database, it's an old database. It's not the legacy PPC, the database that we are using right now after the migration to DDT. After we spoke with Harry, 
Because initially we wanted to switch Pilgrims database to like a CPPC and write directly from Click to like a CPPC database, but that for that we needed to have new connectors between Click and Snowflake. 
So these connectors needed to be set up and that is like a separate. 
set of permissions. So we had like multiple conversations on this and like together with Harvey from Pilgrims team, Pilgrims IT team, we came up to the conclusion that the easiest way for us right now will be to keep writing into Pilgrims using the connectors that are already established and 
that we were using for half of the year before migrating to DBT. But then afterwards, like the last step in this chain, in this data flow, is that we copy all of the final data to the legacy VPC. 
So we keep everything in Pilgrims database, everything that is communicated with Qlik Sense Sales Master Data Management app. From the silver layer, Pilgrims DB, we also have data governance gold layer. 
schema. 
And currently, we do not have any lag between updating the silver and golden layer. So the same stored procedure that grabs the data from click is updating the silver layer and gold layer immediately. Before. 
Like, once one month ago, probably before switching to DBT, we did have. 
a different way because we were not using stored procedures like click were writing directly into silver layer and then once an hour we were. 
bringing the changes from silver layer to the golden layer. Now we optimized it and there is no lag, like the changes are immediately applied to both schemes. 
What's important is that in Silver Layer, we are keeping all of the history. 
And by history, I mean that the history of changes. So let's say this ship to record. 
that is a distinct like unique ID in this table in the UI. On the silver layer, this ID, it may be duplicated 10 times because we are saving all of the changes. We can see who and when apply this US food methods or apply like this method. So every time a user is making a change, 
and is clicking on the save changes button. We are duplicating this row of the ship to and you're saving the timestamp of the change and who requested the change. So the silver layer table. 
It has, so this table has like 1000 rows. 
But on the silver layer, we may have like 20,000 rows because we are saving all of the historical changes. 
Of course, in the golden layer, we don't need all of the history. We need just last updated rows. So that's what we do. And the golden layer in Snowflake will look exactly like this list in clicks inside. It will include only like 1200 rows. So that's what we do when we try. 
transferring the data from silver to golden there, we're just bringing the most updated data without any history. 
And then every hour within the business time, we are copying the changes from Pilgrims DB to Legacy PPCDB because all of the applications, like except for sales master data, like for example, if we need the territory matrix data for CRM dashboard or for any other dashboard. 
We will use the golden layer table from legacy PPC. 
Yes, Leonardo, you have a question? 

 
Contezini, Leonardo   27:52 
Yes, please. If in the gold layer you just use the most recent data, why do you need to store the historical data in the silver layer? 

 
Zhyrovetska, Khrystyna   28:08 
Because of the safety reason, I'd say, in case like we are, I don't know, someone applies the changes that should have not been applied so that we could have just the history of who and plan. 

 
Contezini, Leonardo   28:15 
Mhm. 

 
Zhyrovetska, Khrystyna   28:26 
apply the changes because this is the master data that will be populating lots of the applications and will have impact on lots of different dashboards. So this is pretty important information. That's why we decided to keep it. 

 
Contezini, Leonardo   28:27 
Okay. 
Okay. 
So it's mostly for audit reasons. 
Right. 

 
Zhyrovetska, Khrystyna   28:46 
Yes. 

 
Contezini, Leonardo   28:47 
Okay, thank you. 

 
Zhyrovetska, Khrystyna   28:53 
So that's basically it on the general data flow. Do we have any questions here? 

 
Imamura, Rodrigo Eiki   29:11 
I have a question. 

 
Zhyrovetska, Khrystyna   29:12 
Okay, and then, yeah. 
Is gone. 

 
Imamura, Rodrigo Eiki   29:17 
Who extracts the distinct values from the fact data sources? 

 
Zhyrovetska, Khrystyna   29:26 
On the snowflake side, it is done. 

 
Imamura, Rodrigo Eiki   29:27 
Yes. 
And so. 
I understand this. 
I plan to live outside TPT, am I right? 

 
Zhyrovetska, Khrystyna   29:42 
Sir, could you please repeat once again? 

 
Imamura, Rodrigo Eiki   29:45 
Da. 
Transformation transformations doesn't happen on the DBT pipeline. 
It is start procedures on Snowflake. 
Da right. 

 
Zhyrovetska, Khrystyna   30:03 
We are using stored procedures to bring the data from QuickSense site. That's right. 
For the five data sources, I don't think that we are doing any transformations in this process. 
But yeah, let me clarify this with Phillip. 

 
Imamura, Rodrigo Eiki   30:21 
E. 
Okay. 

 
Zhyrovetska, Khrystyna   30:27 
None that I know, like, none transformations. 
Okay, let me then show you this wall in Snowflakeside. 
We have Pilgrims database and we have data governance. 
Ski data garden and silver wire. 
And let's take some mapping table, for example, mapping a customer classification, so... 
This mapping customer classification, this is essentially the table that we are right now calling direct sales mapping on the UI. 
And... 
It has all of the columns that I show up during click sense, except for these two metadata that we are saving like last update. This is the timestamp on when the change occurred to a particular row of data. 
and updated by. You can see the data that comes from Qlik Sense, it is using this format. So the user that updated this role is JSON. 
But this customer classification table, it is pretty big one. 
it has 56,000 rows. And it may not be very convenient to map this 50,000 rows in the quick sense side, because in Excel, like you can copy one value and populate it over the 100 rows much easier than that. 
You can do it in in a quick site. 
So sometimes, especially for that table, Jacob and his team, they are extracting this data, downloading it. 
In the CC format, they are mapping all of these values in Excel, and then they are providing this Excel to us, to Phillip, and Phillip is uploading this file into Snowflake, and when he is doing it, he is basically... 
introducing some value in this updated by column, like for example, JSON mapping file main or Jacob mapping file June. This is just some text that allows us to identify by which file we updated this or that row. 
So, that's why you may see a different formatting in this dated by column. 
And also, sometimes we're not showing all of the codes or IDs on the UI. So on the Snowflake side, for each description column, we would, in most cases, we would have also territory code columns side by side. 
But, for example, here on the UI, you just have a description. You don't have the codes because users don't really need the codes here, but when we will be using later on this data in CRM application. 
We would be taking the codes from here to do some mappings. 
just to use it as a dimension in some dashboards. And what's important is that since users provide only the description, that's what Qlik Sense is writing to Snowflake, just the descriptions. So these code columns, they are. 
populated on Snowflake side based on the description. So we have like a separate job that basically compares the descriptions from like the territory description from this table and the territory descriptions from the LOV or configuration table. 
And this one. 
And we will bring the code, we will fill in the code in this mapping table based on the description provided. 
Yes, do you have a question? 

 
Da Costa, Vitor Hugo   35:25 
Yeah, just to clarify for me, we have records in this mapping customer classification table that are from Clicky and records that are from the Excel file that Jacob uploaded today's no flake or I don't understand it. 
In the right way. 

 
Zhyrovetska, Khrystyna   35:48 
Yes, we may have both. Either the records that users updated or the records that were brought from the file. 
And on the QuickSense side, let me show you some example. We're just showing the latest updated version, but the same row can be updated like 10 different times. Like one time it was updated by Jason, then by Jacob, then by Excel file, then again, somebody else updated it. 
So let me just find some example. 
I want to take. 
Okay. 
Give me just a minute to put on. 
So let's see on this row, I'm specifying here 4 attributes because those are the keys for this table. So each distinct row in this table, it is basically based by the product, ship to payer and product center combination. 
So we may see that this combination, it has like 4 different rows in here. That's why it was updated four different times. Let me sort it. 
So this record, it was updated by... 
Excel file multiple times in June, and also by Excel file provided by Jason in May. And here, like you can see the times. 
Okay, this one, it was some updates than Phillip. Fellipe probably uploaded this file a few times. But let's compare what were the changes between the Jacob and the J, between the JSONs and the Jacob file. So in May and then in June. So we can see that all of the fields here are the same. 
But there will probably be some changes, I hope. If not, then that's a bad example. 
Okay, everything actually matches in here. 
But it could have been like the territory has changed. So the JSON provided the territory as a name, but in Jacob mapping file, the territory changed to, I don't know, Southeast. In this case, those are actually all of the same examples. We were just uploading the same file. 
three times in June and then 
For this specific key combination, there were no changes. But for the other ones, you may have seen lots of changes here. 
So, in Silver Layer, as you see, we are keeping it. 
Every action. 
In gold layer, we would have just one row. 
Four days was the latest info. 

 
Contezini, Leonardo   39:56 
Yeah. 

 
Zhyrovetska, Khrystyna   40:01 
Let me show it to you. 

 
Contezini, Leonardo   40:07 
Christina, one more question still related to this. But how does the user update the information? Do they send the spreadsheet to Fellipe, for example, or do they upload it by themselves? 

 
Zhyrovetska, Khrystyna   40:13 
Mmh. 
So 2 ways, either they send a spreadsheet to Fellipe. In most cases, it's just only related to this direct sales mapping because it has almost 60,000 rows. And just imagine that you have to map the 60,000 rows and you have to... 
Specify some fields. 
like 6 fields for each row without having a... 
functionality that we do have in Excel where we can easily copy and paste over a number of rows. So that's really very tedious. So for this table, most often users provide us Excel spreadsheet that we just load into Snowflake. For the other tables, like... 

 
Contezini, Leonardo   41:04 
Mm-hmm. 
Da, the. 

 
Zhyrovetska, Khrystyna   41:14 
This one, it has very few roles. Users go into this application and they are changing the values here and saving them. 

 
Contezini, Leonardo   41:18 
Mhm. 
Okay, but when it's outside the right back tables, then they depend on the team, right? On Flippy or on you to send a spreadsheet and then you upload it to Snowflake. 

 
Zhyrovetska, Khrystyna   41:37 
Yes, that's right. 

 
Contezini, Leonardo   41:40 
Okay. 

 
Zhyrovetska, Khrystyna   41:41 
There is no really point in automating this flow because... 
Now, we... 
After we tried working with this write back tables, we saw some drawbacks of this functionality or some limitations. 
Of the clicks and sites, it it really works well for small data sets, but for long ones like this was 60,000 of rows, it's it would be how to map it in clicks and site, so now like it would be good. 
to come up with some other solutions and the general application for the master data management process. 
That could be Excel loading into SharePoint. It could be some other applications that are developed specifically for master data management. There could be some other ways. But I know this is. 
something that should be done in the future because manual upload of the files into Snowflake is just a temporary solution for us. 

 
Contezini, Leonardo   42:58 
Okay. No, I agree with you. I understand. 

 
Dickson, Dustin   43:01 
And Christina, correct me if I'm wrong, but Leo, this would also apply to the mappings that we're doing the same way. 

 
Zhyrovetska, Khrystyna   43:12 
Yes. 

 
Dickson, Dustin   43:13 
So, we would want to move those off of clicks, and so we need to we need to get a final solution on how to manage master data. We we are no longer thinking clicks is the right right back is the right way. 

 
Contezini, Leonardo   43:26 
OK, so. 
This is a change that we already we we can consider already, like we don't want to depend on Click Sense in for the right-back tables, is that correct? 

 
Dickson, Dustin   43:38 
Yeah, that's correct. 

 
Contezini, Leonardo   43:40 
Okay. 

 
Dickson, Dustin   43:41 
Who? 
We did it because... 
We liked it, the governance of it, that it was all visible, and we were envisioning using Click Sense as the analytic tool, but now we call it and everything else, and the complexity we're seeing with the write back on larger tables. 
we think we got to find a different solution to be able to be more. Now, and Khrystyna is showing us a lot of the process of us loading a system and building out for the first time. Long term, we expected that that volume to slow down so that write back would not be as big of an issue. 

 
Contezini, Leonardo   44:04 
Mhm. 
Okay. 
Mhm. 

 
Dickson, Dustin   44:26 
But still, at the same time, we just don't like the solution. Even if it was to slow down, we still think it's very cumbersome and clunky for what we're trying to accomplish. 

 
Contezini, Leonardo   44:39 
Okay, I agree. I understand. 

 
Dickson, Dustin   44:46 
Khrystyna, remind me, is right is the only other place we have right back beyond the master day we were discussing today? 

 
Zhyrovetska, Khrystyna   44:47 
Yep. 
I think in Leonardo app, in store market data, there is also some. 
Um... 
There were at least two tables. 
For product. 
View mapping and brand mapping. 

 
Dickson, Dustin   45:18 
K. 

 
Zhyrovetska, Khrystyna   45:19 
Let me open this app. 

 
Dickson, Dustin   45:21 
I would suggest that... 
I'm more and more convinced that Jacob's team needs to handle all master data and that there should be no user access to the end user access to that just because of what we're seeing across the business, the inconsistency in how we're doing it and no governance. 
So we could think about one product table, one customer table, one sales hierarchy, not one table, but one set of data. Because the products are always the products, right? So right now, Christina, I think we're managing products that are 

 
Zhyrovetska, Khrystyna   45:57 
Okay. 

 
Dickson, Dustin   46:04 
overlapping these other data sources, right? So all I'm saying is we may have this broken apart even too much at this point. We may need to even consolidate further. 

 
Zhyrovetska, Khrystyna   46:16 
Yeah. 

 
Dickson, Dustin   46:24 
Yeah, that SKU mapping could essentially be mapped on one master product mapping table in just a column for Kroger, right? 

 
Zhyrovetska, Khrystyna   46:39 
Yeah, it's essentially mapping Kroger to our SAP SKU numbers. 

 
Dickson, Dustin   46:43 
Mmh. 

 
Zhyrovetska, Khrystyna   46:47 
And there was the other one. 
manufacturer to brand similar thing. Kroger does not like the only column that they have on their site is inside manufacturer and the way that our users are used to structure their dashboard it's by the brand. Like is it Pilgrims? Is it Jasper? Is it... 
Any other brand, so we are mapping those manufacturers to brands. 
So, yeah, those are the three apps where we use it: a store level data, Sircana, and Master Data Management. 
What? 
All right, yeah, I just wanted to show you that the same combination of keys in the golden layer customer classification table, it produces just one result, just one row, and that is the row was the latest updated. 
time stamp from the silver layer table. And this is the table that will later on copy to the legacy PPCDB from this DB that's like exact copy, no changes, no transformations happen there. 
And from the legacy PPCDB, and we are using this customer classification table in CRM dashboards, for example, and I think we will use it in the other dashboards as well. 
So that is this Flow. 
AU. 
Yeah, this is already the CRM flow. Let me see if I missed anything on master data. I want to check the documentation. 
And, if you have any questions, feel free to ask them. 
Da. 
I will also share with you all of the documentation that you have on the master data. 
And we will have next week some meetings also when I would invite Nata and Phillip. 
Ohh. 
Matthew will show you also the backend side from the Qlik Sense, and Phillip will be able to answer your questions on the Snowflake side. 
So I keep all of the documentation here in the master data project. I have the word file with business requirements on the on each of the tables in that. 
application. In this table, you will be able to find the details on the table structure, like what columns it has, how they are being updated, where the values are taken in each of the drop-down lists. 
And also, how are we refreshing this data and what filters we apply? So, for example, in that customer classification table that I was showing to you, we apply lots of the filters and we do update them from time to time, like the list of. 
Profit centers was changing recently. We added the filter for finished products only. So these filters are pretty important and they may be updated. 
And you will find all of these details here or each of the table. 
And, but this is more like the business-related information. 
And Liba has also compiled documentation on the software side. 
Ohh. 
Yeah, like architecture, yeah, environments. Let me also mention this probably because we have two environments, like as we do for all of the applications, but here the flow is a bit special. So on the production side, I showed you the flow, it looks like. 
This, but before we distribute any changes to production, we make those changes in. 
Da, and by changes I mean. 
not changes to the mapping, but like adding some columns or changing the filters to the data sets, like changing in the code in the implementation of the tables. 
So in Pilgrims database, we have two schemas that are called data governance silver dev and data governance called dev. 
Ohh. 
Solids and stuff like. 
Yeah, this we have data governance silver and data governance silver dev, so all of the tables that are in this schema, they are solely for the development purposes and the dev version of. 
Qlik Sense app, it's been writing to this dev tables. Prod version of the Qlik Sense app, it is writing into this schema. 
So then from this dev schema, you're done. 
Moving the data to this gold layer dev schema, and then from this layer, we actually did not print the changes to the legacy PPC database. 
Yes, everything that is in the legacy PPC database that's already the production. So currently Phillip. 
Ohh. 
Is making the changes in his own. 
Database, and maybe in his documentation he has name of that DB. 
Yeah. 
There is DBT. 
Like, in our case. 
it would be DBD and then Phillip Tafner, PBC master data table. So the only important point that I want to draw your attention to is that on the dev side, we do not use legacy PPC DB, but we use. 
Some to be called DBT Phillip Tafner, if I'm not mistaken, so that's the only change in the dev environment. We did it last week, so I have not yet updated this data flow because that is pretty recent change, but it's important because on the quick sense side. 
When, for example, you will take over the application on the environment, we're connecting not to this database, but to another database that's called like DBT Phillip. 
So that's an important point on the GVA environment. 
And you will be able to also find out more information, like on the stored procedures and some name conventions, some validations that we do, because in this stored procedures, for example, we also have some logic that converts all of... 
The text that we receive from Quick Sense into uppercase, because you may have noticed that. 
I. 
That's an old table. 
Like all of the descriptions in all of the columns, they are always uppercase. So even if users provide in quick sense side, something like with sentence style capitalization, we always redo it into all caps on Snowflake side. And we may have some other. 
validations and some other transformations there. I will share you this documentation with you, and also I'll schedule another call with Phillip or him may speak more about this, but since he will be handling this, he will continue. 
supporting the master data app in the future. I don't know, in like should be diving into details a lot since this project is really like live and it's being changed every week. 
So that's it from my side on the master data. Any questions? 

 
Contezini, Leonardo   56:43 
No questions from my side, Khrystyna. Thank you very much. 

 
Imamura, Rodrigo Eiki   56:47 
Me neither. 

 
Da Costa, Vitor Hugo   56:49 
Me neither. Thank you, Christine. 

 
Zhyrovetska, Khrystyna   56:53 
Okay, then let's just agree on our next steps. So in our, for the next week, I'll set up two sessions. One session on the master data with Nata's, where she would be able to show you the back end of the master data, and also one session on the CRM. 

 
Contezini, Leonardo   57:10 
Mhm. 

 
Zhyrovetska, Khrystyna   57:12 
app since we haven't started talking about this one. So I'll share with you like the business requirements on the CRM and also Matt will share the back end side on click on clicks inside. And we'll also briefly talk about Snowflake part, but Phillip will also be maintaining this project in the future, so don't worry. 

 
Contezini, Leonardo   57:17 
Mhm. 

 
Zhyrovetska, Khrystyna   57:36 
Uh, like, if you miss some details there. 
So, that's the plan. 

 
Contezini, Leonardo   57:45 
All right, perfect. I will wait for the for the invitations and also the documentation provided by Fellipe. 

 
Zhyrovetska, Khrystyna   57:46 
Um... 
Yep. 
All right, sounds good then. Thank you all for your time today. Have a nice day. Bye. Yeah. 

 
Dickson, Dustin   57:58 
Christina, Christina, can we do one quick thing? Can you said yes, I believe it was yesterday, you said that some of the snowflake 

 
Zhyrovetska, Khrystyna   58:04 
Yep. 

 
Dickson, Dustin   58:13 
was cleaned up in terms of how we were naming things and where we were putting things. Is that correct? 

 
Zhyrovetska, Khrystyna   58:20 
Yes, that's right. 

 
Dickson, Dustin   58:21 
Do you mind showing that really quick? 

 
Zhyrovetska, Khrystyna   58:26 
Hello? 
Ohh. 
So the cleaned up version that I'm talking about, it's legacy PPC DB. We are not supporting Pilgrims DB a lot, so every new changes are happening here. The main change actually happened in this PPC master data table. 

 
Dickson, Dustin   58:43 
Da. 
Okay. 

 
Zhyrovetska, Khrystyna   58:56 
Oh. 
Currently, in this schema, we have 13 tables. You can see, like most of the tables, they have this prefix D that sacrified that it's the final golden layer mapping tables. Before last week, we had like 70 tables here. 
We had all of the silver layer, we have all of the dev tables as well. We have some tables that we developed half a year ago, but we are no longer using like area to manage your mapping. We no longer have a concept of area. So everything got cleaned up here. 

 
Contezini, Leonardo   59:34 
Mhm. 

 
Zhyrovetska, Khrystyna   59:38 
And also a good example is PPC dynamic schema. This is the schema that Matt uses in Qlik Sense for the CRM app. Now we have just a few tables here. Three fact tables, indirect sales, redistributor sales. 
And this is the new fact table that Fellipe started to develop. This fact table, it combines in drag sales, redistributor sales, and also SAP sales from other DB. So everything will be combined in here. And yeah, previously, we also, I don't remember the exact name. 
the exact number, but we had lots of tables there, probably like 20 or so. And only for indirect sales pack table, we had three different versions that only me and Phillip probably knew what were the difference between each of them. Now, it's cleaned up, just one table for. 
Indirect sales. 
Of course, like maybe we can still work on the naming, but... 

 
Dickson, Dustin   1:00:40 
Okay. 

 
Zhyrovetska, Khrystyna   1:00:45 
Oh, that's alrighty and good stuff. 

 
Dickson, Dustin   1:00:48 
Okay, awesome. The reason why I asked this guys, and sorry if I've repeated this a bunch of times, but I want to get when Lili comes back on board and we onboard the new data architect, I want to get everybody together to review this and to understand 
how we're going to go forward together as a combined team and make sure we have the same standards in this environment. And then also just get together on priorities and how the teams may overlap as we move forward and assign 
specific lanes for each group so that we can stay focused on the most important things, but also work together. So I know I think I've already told this team that, but I'm going to tell Ian's team that on my next call with him. So look for me to have to organize that among 

 
Zhyrovetska, Khrystyna   1:01:45 
Mhm. 

 
Dickson, Dustin   1:01:50 
both the teams that are on the advantage side, as well as the big side, as well as Fellipe, and then also the 42 data lab side. I'd like to get everybody on with my team, potentially even some of the IT folks. 
Folks that we deal with frequently and just get everybody. 
on the same page and having discussions that need to be had. So if you guys have specific questions or concerns or things that need to be brought up during that conversation, I'm more than welcome to discuss that and put that on the agenda for us to make it productive. 

 
Contezini, Leonardo   1:02:32 
Perfect, makes sense, this. 

 
Dickson, Dustin   1:02:35 
Okay, thank you guys. 

 
Zhyrovetska, Khrystyna   1:02:36 
Yeah. 
Thank you. 

 
Contezini, Leonardo   1:02:41 
Thank you, guys. Bye-bye. 

 
Dickson, Dustin   1:02:41 
Bye-bye. 

 
Imamura, Rodrigo Eiki   1:02:42 
Thank you. 

 
Zhyrovetska, Khrystyna   1:02:43 
Yep, bye. 

 
Contezini, Leonardo stopped transcription 
