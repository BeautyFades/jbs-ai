P&L Knowledge Transfer (New Invite for Transcription)-20260609_170002UTC-Meeting Recording 

June 9, 2026, 5:00PM 

37m 24s 

 
started transcription 

Zhyrovetska, Khrystyna   1:09 
Hello, everyone. 

 
Contezini, Leonardo   1:12 
Look, Sonia. 

 
Da Costa, Vitor Hugo   1:12 
Hello. 

 
Contezini, Leonardo   1:15 
Thank you for using this link. 

 
Zhyrovetska, Khrystyna   1:19 
Yeah. 
problem. 

 
Tafner, Fellipe   1:28 
Hey, can you hear me? 

 
Zhyrovetska, Khrystyna   1:31 
Hi, Philippine. Yep. 

 
Tafner, Fellipe   1:33 
That's good. 

 
Contezini, Leonardo   1:33 
Oh. 

 
Zhyrovetska, Khrystyna   1:37 
All right, so let's start. Dustin and Rodrigo did not reply, so I think we can start without them. 

 
Contezini, Leonardo   1:47 
If you can... 

 
Zhyrovetska, Khrystyna   1:47 
Um, so... 

 
Contezini, Leonardo   1:49 
If you can wait like one minute, Rodrigo is logging in. 

 
Zhyrovetska, Khrystyna   1:50 
Yeah. 
Okay. 

 
Rodrigo Imamura   4:08 
Hello, can you hear me? 

 
Contezini, Leonardo   4:10 
Yes, yes. 

 
Rodrigo Imamura   4:11 
Rame late. 

 
Zhyrovetska, Khrystyna   4:12 
Hi. 

 
Contezini, Leonardo   4:16 
We can start, Khrystyna. Thank you very much. 

 
Zhyrovetska, Khrystyna   4:16 
No problem. 
OK, sounds good. 
So today we are going to talk about the P&L project. I'll start with some more general information regarding the project and the business requirements, and then I would ask Fellipe to continue with the data warehouse solution that we did. 
So I'm gonna be sharing my screen. 
So in general, we do have the PNL application in our inside our Qlik Sense dev environment. This application has never been finished or published to the production. 
Because we always had some other priorities, so we started briefly working on this project, but then our team was moved on to some other ones. So this project has not been finished, although we already have something developed. So 
Generally the P&L project. 
is related to prepared foods PNL spreadsheet that currently the revenue management and other teams use. So at the beginning of this project, we've been, we got this file. 
I will share it with you. This is the Excel spreadsheet that is being updated on the weekly basis. So this is basically the snapshot of one week in 2025. I don't have the current most updated version, but this is 
what we used to develop. 
So this spreadsheet, it basically, it is focused on the prepared foods only and it has the general information on. 
Sales. So in here in this summary panel, summary tab, we have a huge table that is the basis for the whole PNL analysis. And this table. 
It's the lower level of granularity is weak. 
Beach. 
Aggregate into quarters, so I can... 
do it like this. So for each quarter, we are tracking the actual numbers on sales. So this is the actual volume or pounds sold in each quarter. Currently, I did not select any filters, but we can filter out by SKU or brand or channel, etc. 
So I can see what are the volume metrics for the current year, per quarter, per month, or per week. 
And these are all of the P&L measures that they have. So they have cross revenue, freight, freight, net sales, cost, gross margin, and gross margin percent. 
Some of these. 
metrics, they are taken directly, they are already calculated and they could be taken directly from SAP Copa tables or as they are called in Snowflake profitability analysis and profitability analysis history. So in this tables you will already find 
some pounds, gross revenue metrics, freight or trade. But I think for gross margin and gross margin percent, we did calculations on the Snowflake side. And Phillip will be showing you the data warehouse. He'll show more details on this. 
So these are all of the measures that they track as actuals. The next set of measures from column J to column N, it's budget. So most important measures 
are budgeted. Those are volume. You can see that they are tracking actual volume and budgeted volume. And this is actually not the budgeted volume, but it's the difference of the budgeted volume and actual one. 
Um, so... 
volume sales, and its net sales, budgeted net sales, budgeted COX, gross margin, and gross margin percent. So most of the measures that we have here in this section, we do also have for budget. For this, 
section, we have a separate table in Snowflake called Budget, and we logged this table from the Excel file, the same Excel file that where this table is sourcing data from, but that budget volume, it was specifically. 
And then Excel file, it was specifically done for 2025 year. And... 
We don't have any ETL process developed for the budget data. So currently. 
All we have is budget for 2025 and for 2026, and your Excel file must be requested from the business team. You must log in and then develop a detailed process of how the budget numbers will be getting updated. 
So those are the budget numbers. Down the last section is the comparison of actual performance with prior year. So you can see like this triangle means that it's basically actual volume minus 
prior year volume. So we see that, for example, in quarter one, we have 133% of increase in sales as compared to the prior year. So we have prior year volume, prior year gross sales or gross revenue. 
freight, freight, net sales, cost, gross margin, and gross margin percent. So all of the same metrics that we have here. And since the prior year data could also be found in the SAP tables. 
You could calculate all of those measures, having the data from the SAP. 
And currently in the Excel, sorry, in Qlik Sense, we have this table reproduced. So you can see that we have all of the same measures like volume, gross revenue, etc. Then we have budget and budget is showing the budget for the 2020. 
It's like, actually. 
Um... 
And we have the first invoice the prior year. 
This could also be unfolded in two months or weeks. 
And. 
Coming back to the Excel spreadsheet. 
Here we also have this chart up above. This is the main KPI tracker, I would say. So they have this buttons, filters, that impact the measures that are shown here. So 
I just clicked on actual. So this actual button, it will show actual metric per pound and its comparison, actually just actual metrics. If I select budget, I'll have comparison with the budget. If I select 
Prior year, then I'll have the comparison with the prior year. 
And here we have listed all of the 12 months of the year. 
And this is basically one of the most important measures that they track cross margin, so... 
Um... 
Basically, I don't remember the exact formula of gross margin, but it's something like gross revenue minus or net sales minus COX, if I remember correctly. So, and net sales is just gross revenue minus freight and trade. 
also if I remember correctly. So all of these measures, they are interrelated. And like the final measure is cross margin, the final one, the most important one. So I know that they tracked that this measure should be as high as possible. 
So this is just a small version for very quick analysis on our RV was the gross margin. It basically in this table it has like all of the same information, just more detailed one. And this is like more simplified. 
And here they also have a few charts. 
And we try to reproduce this chart because you can see that they are specific. If I remember correctly, they are using Zebra BI or something like this extension to the Excel to build these charts where they compare volume sales with prior year and the budget. 
So they have like 3 measures for each bar, for each of the 12 months, and then they have a total bar for all for the whole year. 
And. 
We tried to reproduce this chart, that's why you... 
this version of the dashboard you see the step and all chart tests because there is no such chart type in Quick Sense that would satisfy all of these requirements for this chart. So we were just playing with different. 
chart options. You can, I don't know, use it or you can delete it. It's just really a working copy of the click developer. 
Um... 
It's not the part of the already like confirmed dashboard. 
Um... 
Then let's move on to the next tab. So we do have then same information, but it was different level of granularity. So here they are tracking the same P&L, like actuals versus prior year comparison. 
But on the skill level. 
So all of these are skews that we can select and filter to. It's just a different version. We did not develop this table, just the first one summary. 
Then we have this trade rate summary. 
which basically also has the same measures than in the first tab, like we have actuals, actual and prior year comparison for each of the measure and different slides of the data. We have skill level, 
brand level and then sub channel. 
And volume by customer, so another slice where we start. 
Ohh. 
Was the customer, and... 
By a customer, they probably mean a ship to. 
This needs to be checked. 
But yeah, all of the same measure, like volume and trade. 
And. 
It should go on. It's just something that I think we were playing around with. 
So basically we received this Excel spreadsheet. We did not have a lot of contact with business users on this, or at least me. I think Lili maybe had like a bigger involvement in this part. So maybe she would know like more idea. 
I can have a better picture on how this P&L is being updated, adjusted, why do they use charts like this? From our side, we received this Excel spreadsheet and we tried to put all of the data that we needed for it into Snowflake. 
because most of the data was just loaded once from the Excel spreadsheets and now it's not been updated. And then we tried to build this PNL summary page in quick sense. 
Oh. 
What's also worth mentioning regarding this table is that this table also needs some more work. So apart from updating like budget, because budget numbers won't be relevant for 2026 year, because the numbers are... 
from taken from 2025. There are a few filters that aren't working, like for example, quarter is working or the channel. 
Sam. 
But for example, product type or process type filters, we added these because we needed them for some demonstrations to business stakeholders. We've been asked to add them, but they are not present in the. 
In all of the tables in Snowflake that we need, if I remember correctly, like the budget table does not have any. 
links to the reference table where we take these dimensions from by product type or process type. So the filtering logic needs to be reviewed and like these two filters. 
Currently, they are not working, and that would be the task to basically get these values and get these filters working. I think that you would need to check this with Dustin, because... 
Since. 
It was almost a year ago when we started working on this project. And since that time, we already developed master data project. And all of this mid-type, product type, process type, even channel and sub-channel fields that are currently working. 
We would need to check with Dustin if you need to keep using those fields or if you need to connect. 
This dashboard was the master data, because currently the master data has defined channel and sub-channel for each sale, and we type product type and process time for each SKU. So, we have like mapping tables, I can show you just one example, so you would... 
I have an idea on what I'm talking about. 
Because like this meet types, for example, we loaded it from some Excel spreadsheet that also is not being updated, but you would need to have this meet type defined for each SQL. 
And where you could get it is from this product mapping table that has all the SKUs listed here and where we have product type, process type that you need and meet type. 
So, I think that we are now. 
tables need to be connected with the master data tables and all of these filters need to be changed to the master data because that's the data source where all of these attributes, they are being updated very often. 
Um... 
That's probably it on quick side and 
Yeah, let me know if you have any questions. 
Otherwise, I would ask Fellipe to. 
Go around the snowflake. 

 
Contezini, Leonardo   22:33 
I have one quick question. Is the Click app ingesting data from this same Excel file you are showing right now? 

 
Zhyrovetska, Khrystyna   22:41 
Uh, no, click sounds is connected to Snowflake. 
So in Snowflake, we have our legacy PPCDP, where we have PPC P&L schema. And in this PPC P&L schema, we have all of the tables that we use for the click sense. Actually, we are not using all of these eight tables, but for example, we take actual data from 

 
Contezini, Leonardo   23:02 
Okay. 

 
Zhyrovetska, Khrystyna   23:08 
This table, we take Forecast from here, we take a budget from this table, and some other dimensions from reference, so everything is in Snowflake, it's just the tables are not being updated, so it was one time load and the data. 

 
Contezini, Leonardo   23:19 
Uh-huh. 

 
Zhyrovetska, Khrystyna   23:28 
Is outdated there. 

 
Contezini, Leonardo   23:31 
Okay, but where is the data in Snowflake coming from? 

 
Zhyrovetska, Khrystyna   23:39 
A lot, Phillip, yeah. 

 
Tafner, Fellipe   23:40 
Most of them is coming, yeah, most of them are coming from CSV files. I would say that the only one that has an ETL process that runs and get new data is fact actuals. And all of the other ones are CSV files at the end. 

 
Contezini, Leonardo   24:03 
Thank you. 

 
Zhyrovetska, Khrystyna   24:06 
So, Phillip, maybe you could... 
Show the snowflake side a bit more. 

 
Tafner, Fellipe   24:15 
Yeah, absolutely. So let me share my screen. 
Okay, so I started preparing a document. I have to complete it for the Projects. And this is what we have for P&L so far. There are some stuff that I'm going to change it, some details that I'm going to explain to you. 
But with this document, you can get the overall idea. So for models, we have... 
For models and... 
We have 4 seats. This is why you are seeing 8 tables. I'm going to migrate these seats to another schema. At this point, I think it is not necessary. 
To side a SharePoint folder. 
I think that since the CSV files should not be updated weekly or monthly, we can keep them into another schema in Snowflake. And we are not talking about huge CSV files, like 10 megabytes, 50 megabytes maximum. 
Which is what I would say the only real. 
and all of the other ones, you know, that are just static documents. So this is the services. So we are using profitability analysis and master material table. 
And, as I said, I'm going to introduce other tables here. 
in order to not use seeds anymore. Okay. So talking about fact actuals, I think the only important thing that you should know is that we have a filter where we get some profit centers and some distribution channels and we are taking sales only from 2024. 
onwards. In terms of aggregation, we have the net sales that is calculated using this formula. You can check at the code right over here. 
Okay, so basically we are getting profitability analysis. 
With the history, also. 
Master material, as I said, and we are just getting all of this information from these tables right here we have. 
All of the filters, as I said. 
And we are calculating some stuff like these net sales here. 
We are using gross revenue. 
Great inland, et cetera. 
And at the end, we are presenting the data aggregated, so... 
Pretty simple. 
logic here. 
Nothing very complicated. 
Ahh. 
And... 
Here are the joins that I have talked about, only join with mess. 
The granularity, we are talking about one row by posting date, product, payer, and ship to party after aggregation. Okay, not weekly, daily by posting date. 
AU. 
Until now, as I said, I am using Data Eiki Dev schema, and these tables here, these three tables, I am doing this pass through, which should extend to the other four tables that are currently. 
Uploaded to Snowflake via seeds in DBT, so... 
This is what we have so far. And well, there's not actually not much. 
really simple. As I said, the only thing that you should take into account is this fact actual stable. That's the only one. If you take a look at any other one, let's say, for example, cost Forecast, it is the pass-through that I have. 
After the seats, as I said, I should be moving them to the same logic that we have for the other tables, so... 
Yeah, that's what we have. 
So, do you have any questions at this point? 

 
Rodrigo Imamura   29:11 
I have some questions. 

 
Tafner, Fellipe   29:13 
Okay. 

 
Rodrigo Imamura   29:13 
Ohh, in total, there are 8 tables, one being effective table that has an ETL process. 

 
Tafner, Fellipe   29:17 
Yeah. 
Mhm. 

 
Rodrigo Imamura   29:22 
are being updated and three CSV tables that were manually ingested into Data Eiki Dev. 
Am I right? 

 
Tafner, Fellipe   29:34 
Yeah. 

 
Rodrigo Imamura   29:36 
and for tables that are being adjusted. 

 
Tafner, Fellipe   29:41 
through seats. Yeah, they are also CSV files, but as I said, I'm going to be moving them there. And not thinking about using Fivetran for this because we don't need these recurring. 

 
Rodrigo Imamura   29:41 
In the two seats, three seats, yes. 
Okay. 

 
Tafner, Fellipe   29:55 
Effort that five. 

 
Rodrigo Imamura   29:59 
And... 

 
Tafner, Fellipe   29:59 
And that folder is an update and snowflake tables. 

 
Rodrigo Imamura   30:01 
For the fact table, what tables are being joined with the fact table? 

 
Tafner, Fellipe   30:09 
We just have profitability analysis and master material. Actually, it's better to see it here. 

 
Rodrigo Imamura   30:12 
Mm. 
Mmh. 
Yeah. 

 
Tafner, Fellipe   30:18 
the joins, yeah, we have portability analysis and master material, and we are joining them on a product. So if you go right here. 

 
Rodrigo Imamura   30:25 
Mm. 
And. 
How are the other tables being used? 

 
Tafner, Fellipe   30:39 
Probably they are just being used by... 
Some reports that Khrystyna just showed you. 

 
Rodrigo Imamura   30:46 
Mhm. 

 
Tafner, Fellipe   30:47 
Nothing more than this. Here's the trine. 

 
Rodrigo Imamura   30:49 
Okay. 

 
Zhyrovetska, Khrystyna   30:51 
Actually, not all of the tables, because... 
For example, the one that you have opened, cost payer Forecast comparison. So with Forecast, I don't remember exactly the situation, but we have cost Forecast and we have payer Forecast, two different tables. In these analytics in Qlik Sense, we are using just cost Forecast. 
Just one table. I think that at first we received the payer Forecast table. We started working with it and then I don't remember exactly, but we received another file from Cost Forecast. And then Lili asked us to develop another table to compare. 

 
Tafner, Fellipe   31:24 
Yeah. 

 
Zhyrovetska, Khrystyna   31:40 
how actually those two tables differ. So that's why we have this cost payer forecast comparison table. But we just use one cost forecast. And I think that it's been already a year since we developed this. So the logic for the P&L spreadsheet and the various P&L spreadsheet may have already been changed. 
So you just really need to contact the business users together with Dustin and... 
clarify how the cost for Forecast or how the forecast numbers are done now. 
So my main point was that not all of the A-tables are being used. 

 
Rodrigo Imamura   32:31 
Okay. 

 
Zhyrovetska, Khrystyna   32:32 
It's just for, I think, actuals, budget, cost, Forecast, and reference. 

 
Rodrigo Imamura   32:44 
Okay, I don't think I have any more questions. 

 
Contezini, Leonardo   32:51 
Christina, when do you think we will have this documentation available? I saw you were writing a documentation and also Fellipe told that he was finishing the one he presented, right? 

 
Zhyrovetska, Khrystyna   33:07 
Yeah, we will send you the follow-up today with the documentation link. 
Let me add Phillip, this Phillip. 
Ohh. 
Just a second. 
So you see that Phillip is trying to join the other link. 
Hey, Phillip, can you hear us? 

 
Tafner, Fellipe   33:39 
Yeah, my microphone and my headset stopped working. I don't know where. 

 
Zhyrovetska, Khrystyna   33:41 
Okay. 
Yeah, no problem. So yeah, Leo was asking about the documentation. So I will share you my doc after the meeting with the follow up message. And Phillip, will you be ready to share your documentation on PNL today or do you need to? 
To update something. 

 
Tafner, Fellipe   34:05 
I'm going to update it. I probably can send it by today also. Tomorrow morning next month. 

 
Contezini, Leonardo   34:10 
Okay. 
Perfect. Thank you very much, Casas. 

 
Zhyrovetska, Khrystyna   34:14 
Okay. 
Thank you. Dan, just one last thing from my side to go through the next steps. 
So, in general, I'd say that... 
you would need to start the P&L project almost from scratch, because you need to contact the business owners of the P&L. And you could ask Dustin, because I'm not really aware who the business stakeholders are, because all of the communication was done through Lili in this project. 
So you would need to define the business owners of the P&L and talk to Dustin about this and get the latest Excel files from them on budget data, on Forecast data. Talk with Dustin if you need to start using master data. 
or the mappings from the Excel spreadsheet, but I think it would be the master data. You would need to either update the already existing Snowflake tables or create new ones from scratch, because for example, was the budget. 
tables, you would see in Snowflake that we have two tables, budget and budget 2024. This table has data for 2025 and this one for 2024. And the reason why we have two tables is because the format of the Excel 

 
Contezini, Leonardo   35:41 
And. 

 
Zhyrovetska, Khrystyna   35:54 
Excel spreadsheet has changed A lot. So in 2024, they were tracking budget in one format, then in 2025, they started doing it in the other format. So maybe for 2026, they changed the format once again. So you would need to create your own tables. 
Yeah, you would need to. 
do the snowflake side and set up the ETL to update the data. And on click sense side, like the minimum thing that needs to be done is to update filtering logic so that all filters could work. But of course, if snowflake side will change a lot, then. 
It would also impact quick sense. 

 
Contezini, Leonardo   36:39 
Okay, perfect. Well, that's great. 

 
Zhyrovetska, Khrystyna   36:45 
All right, so does anyone else have any questions? 
All right. 
And thank you all for your time. I'll send out the documentation and Phillip will send his part soon as well. And in case you have any questions, yeah, feel free to contact us. Thank you. 

 
Contezini, Leonardo   37:15 
Thank you very much, you guys. Have a nice day. 

 
Rodrigo Imamura   37:16 
Thank Yu. 

 
Tafner, Fellipe   37:17 
Thank you. You too. Bye bye. 

 
Zhyrovetska, Khrystyna   37:18 
Thanks, bye. 

 
Contezini, Leonardo   37:19 
OK. 

 
Contezini, Leonardo stopped transcription 
