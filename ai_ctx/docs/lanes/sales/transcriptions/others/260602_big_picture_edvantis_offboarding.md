Consolidated App + CRM Transition (New Invite for Transcription)-20260602_130004UTC-Meeting Recording 

June 2, 2026, 1:00PM 

1h 48m 30s 

 
started transcription 

 
Contezini, Leonardo   0:46 
Hi, Khrystyna. 

 
Zhyrovetska, Khrystyna   0:49 
Flow. 

 
Dickson, Dustin   4:59 
Morning guys, can you hear me? 

 
Contezini, Leonardo   5:03 
Or in Dustin, yes. 

 
Zhyrovetska, Khrystyna   5:03 
Good morning, Dustin. 

 
Dickson, Dustin   5:05 
All right. Sorry about that. We had a traffic jam coming into the facility here. 

 
Contezini, Leonardo   5:11 
Yeah. 

 
Dickson, Dustin   5:16 
So, Khrystyna, I asked Leo to join us just so that we could start to look at the total picture here. I don't know if you had an agenda that we needed to cover in or what specifically we were going to cover today, but I don't want to disrupt anything we needed to cover on your side, but 
If we're going to discuss the GTM analytics, then I think we need to. 
Start discussing the whole thing together. 

 
Zhyrovetska, Khrystyna   5:49 
Okay. 
Well, in general, I had a meeting with Jacob last Friday, I think Thursday or Friday, so we discussed like all open questions. Maybe there would be still any questions from Jacob's side, so maybe we could add him after eight. 
AM, I can one hour to the meeting, but otherwise, yeah, we could start just with... 

 
Dickson, Dustin   6:14 
Okay. Okay. 
OK. 

 
Zhyrovetska, Khrystyna   6:21 
General idea. 
How did you tell? 
And yeah, I could show you some latest updates. 
So let me open the app. 
And before we start, Dustin, one question to you. Regarding the CRM project, I just want to understand like in what level of details you would need to 
walk Leonardo and his team through like the data house, will Fellipe continue working on the CRM project or will Leo's team take this over? Just so I could understand. 

 
Dickson, Dustin   7:59 
Um... 
I think Phillip will still work on it for now, but I guess specifically what part of the CRM are you talking about the... 

 
Zhyrovetska, Khrystyna   8:12 
The data integration, yeah, for CRM and also data for analytics. 

 
Dickson, Dustin   8:13 
The Da. 
Yeah, coming, coming back. 
Okay, yeah, for the data. 
So. 
requirements right now, do we have data that we need to send to CRM? 

 
Zhyrovetska, Khrystyna   8:37 
For Dustin, you were a bit caught over. 

 
Dickson, Dustin   8:42 
One second, let me see if something's wrong with my network here. 
What I said, Khrystyna, can you hear me now? 

 
Zhyrovetska, Khrystyna   8:51 
Yep. 

 
Dickson, Dustin   8:53 
Not sure, one. 
Yu. 
Can you hear me now? 

 
Zhyrovetska, Khrystyna   9:47 
Yes. 

 
Dickson, Dustin   9:48 
I have some sort of network issue I'll have to address here in a second, but Khrystyna, the question I was asking. 
Do we have any requirements left to send data from Snowflake to CRM? 
That you're aware of? 

 
Zhyrovetska, Khrystyna   10:11 
Ohh. 
So regarding, I'm just thinking about all of this operator IDs, data central IDs, and broker data maybe on that account, but it's not like we have the tasks in the backlog ready to be developed now. It's just. 

 
Dickson, Dustin   10:20 
Mhm. 
Okay. 
Future. 

 
Zhyrovetska, Khrystyna   10:34 
Yeah. 

 
Dickson, Dustin   10:35 
As far as the data coming back from CRM to Snowflake, is that is is that is Fellipe working on that right now? 

 
Zhyrovetska, Khrystyna   10:49 
This is actually something that Marcio team is helping us with, because Phillip does not have access to some tables in Snowflake, where this data must be stored, so Marcio team. 

 
Dickson, Dustin   11:02 
Yeah. 

 
Zhyrovetska, Khrystyna   11:04 
set up all of the process to get the data to Snowflake. So this is all is also done. The part that Fellipe is currently working on is. 
data integration for analytics. For example, like the new agreements file or the new fact table that will combine SAP sales for distributor sales or operator sales. Currently, we have this data model. 

 
Dickson, Dustin   11:22 
Okay. 

 
Zhyrovetska, Khrystyna   11:36 
in click sense and all of the logic developed in click. 
And we need to transfer all of this logic to Snowflake, because... 
We may stumble upon some limitations if, yeah, we do develop all the logic on the reporting side. So that needs to be migrated to the back end. So there is still some stuff on this side, like mostly to support analytics. 

 
Dickson, Dustin   11:57 
Okay. 

 
Zhyrovetska, Khrystyna   12:08 
You. 

 
Dickson, Dustin   12:08 
OK, so. 
Christina, I think the best way, and this was kind of what I was discussing with Leo before, was 
We need to... 
Basically, provide a list of all of the different activity on this area of the business, all of the different data sources and current state. Do you have anything like that? 

 
Zhyrovetska, Khrystyna   12:40 
Let me see on the data architecture that I already shared with Leo some time ago, it has all of the data sources. 

 
Contezini, Leonardo   12:59 
I don't think we have CRM data inside that one. 

 
Dickson, Dustin   13:06 
Okay. 
Yeah. 
Maybe this, let me just show you kind of what I'm looking for, and to see if we can, because it's hard for me to answer any questions without seeing everything, so... 
We have MPD and. 
I know. 
They have. 
Over Albertson. 
Vitor. 
Yeah. 
The Mix. 
Katherine. 
Just saying. 
I'll redistribute. 
What am I? What are the other Leo? Do you have handy what all the customers are? 

 
Contezini, Leonardo   14:42 
Yes, I do. We have Kroger, Costco, Walmart. 
Sam. 
Ed School and Publix. 
You also mentioned blacksmith yesterday. 

 
Dickson, Dustin   15:01 
Yes. 
Is ABSCO the same thing as Albertsons, Christina, or... 

 
Zhyrovetska, Khrystyna   15:21 
Yes, it's the same. 

 
Dickson, Dustin   15:28 
That's the full customer list, so this is store. 
Old data. 
What am I missing here, Khrystyna? 

 
Zhyrovetska, Khrystyna   16:34 
Maybe Pia now we have. 
Some files loaded into Snowflake for Piano. 

 
Dickson, Dustin   16:43 
Ohh, you know. 

 
Zhyrovetska, Khrystyna   16:44 
And. 
Yeah, on budget, actuals, Forecast. 

 
Dickson, Dustin   17:11 
Anything else? 

 
Zhyrovetska, Khrystyna   17:22 
I think that's it. 

 
Dickson, Dustin   17:25 
Okay. 
So... 
Let's go through here. 
Fix is taking these over, right? These are completely on the big side now. 

 
Zhyrovetska, Khrystyna   17:41 
Yeah. 

 
Dickson, Dustin   17:43 
For Circana, where, what is the status of Circana? 

 
Zhyrovetska, Khrystyna   17:50 
And. 

 
Dickson, Dustin   17:50 
have the, we actually need to break Circana to me into two, right? We have Circana category level. 

 
Zhyrovetska, Khrystyna   17:52 
It was. 

 
Dickson, Dustin   18:00 
Ohh no. 
Yu level. 

 
Zhyrovetska, Khrystyna   18:07 
Mhm. 

 
Dickson, Dustin   18:10 
Me, would you say, would you say this needs more work or no for Shekana? 

 
Zhyrovetska, Khrystyna   18:11 
Oh. 
And. 
Well, yeah, we just finished the knowledge transfer last week, I guess, so everything was transferred to Leonardo, and the only last step that... 
Advantis needs to finish is to validate the switch from old tables to new DBT ones. So by the end of this week, I'll finish validating it and. 
Will your team can continue working on that? 

 
Dickson, Dustin   18:54 
Migrate to DBT. 

 
Zhyrovetska, Khrystyna   18:57 
Yep. 
Just this the SKU level, and instead of category level, it's actually brand. 
Brand level, we don't need to migrate because we need to develop ETL from scratch. We have nothing developed on the brand level. So. 
This needs to be done from scratch. 
I'm bound to develop the application like these new mockups that we created with Sebastian. 
So, that would be the second step after the detail. 

 
Dickson, Dustin   19:41 
Which piece? What did you say? 

 
Zhyrovetska, Khrystyna   19:44 
Like, I probably remember the new mockups for Circana that we developed with you. So after we developed the ETL, the application on ClickSense site needs to be also updated according to the new mockups. 

 
Dickson, Dustin   20:01 
So, let's keep the two things separate, Khrystyna, for this conversation to start with, OK? That... 
Let's assume that we have to get the data right. 

 
Zhyrovetska, Khrystyna   20:11 
Mhm. 

 
Dickson, Dustin   20:11 
And then we have Circana over here. Circana, what are we calling this? What was that? 
What was that dashboard called? 

 
Zhyrovetska, Khrystyna   20:24 
Market insights. 

 
Dickson, Dustin   20:28 
And we have the Microsoft Dynamics iFrames, and then we have the Sales Performance app or the current three applications. 
Is that right, or is there more? 

 
Zhyrovetska, Khrystyna   20:45 
Mm. 
Right. 
There is more, because, for example, like Circon, it's not one app, but it's four different apps. Like, we have a separate app for write back tables, a separate app for combining brand or SKU level, so it's actually much more apps like we have. 

 
Dickson, Dustin   21:03 
Ohh. 

 
Zhyrovetska, Khrystyna   21:10 
Also separate app for P&L, but it has never been launched, so... 
If you want to list it all. 
I'll just make... 

 
Dickson, Dustin   21:22 
Which one did you say we had four of? 

 
Zhyrovetska, Khrystyna   21:26 
Uh, for Sir Connor. 
I'll just. 

 
Dickson, Dustin   21:33 
We have 4 apps. 

 
Zhyrovetska, Khrystyna   21:34 
Send you this screenshot. Yes, so we have the main application called Market Sales Insight. Then we have a separate application for Circana write-back tables. 
Then we have a separate app. This is the newest one where we combine brand and skill level data just like for validation purposes for visualization, etc. And we have the force app. 
where we separated chicken category development page out of the main application of Circana, so that we could bring this to the consolidated app. Let me share my screen for a second. I think it would be just easier to understand it if I show it. 
So this is our consolidated application. You can see that it has links like to store level data or to sales performance app or to Circana category development. So when I click to this button, it actually transfers me to a separate application. Because for all of these. 
tabs that I showed to you, we have a separate data model. 
So it's essential like each tab is the separate app. 

 
Dickson, Dustin   23:01 
Okay. 

 
Zhyrovetska, Khrystyna   23:01 
Just showing like this in the navigation, so we separated this page into a separate app, so we could integrate to this consolidated app, but of course, once... 
The main application will be changed. I think this just needs to be removed and you need to provide a link to like the new application. But all in all, if we talk about Circana, like these are the three apps and this is the four main app. So all of these are. 

 
Dickson, Dustin   23:26 
Yeah. 

 
Zhyrovetska, Khrystyna   23:36 
Comma. 

 
Dickson, Dustin   23:41 
Give me one second. 
Okay. 
Leo, from Kroger, from all of these standpoints, which ones are validate, which ones need validation, and which ones are? 
Or which ones are pending validation, and what's the stage of each one of these? 

 
Zhyrovetska, Khrystyna   24:21 
Sorry, Dustin, could you share your screen once again, please? 

 
Dickson, Dustin   24:24 
Oh, sorry. 
So of the, what I want to do guys is I want to get a status of where we're at on all of this, make sure we have a comprehensive list because here's the ultimate goal. Maybe we start with this is. 
Christina, I've agreed, or I've got agreement from Marcio that we may be able to use Claude to develop a 
to develop a dashboard in a control center for sales as a whole. 
Instead of trying to develop everything in click. 

 
Zhyrovetska, Khrystyna   25:03 
Mhm. 
Okay. 

 
Dickson, Dustin   25:07 
And so... 
I've asked him, he doesn't want to, he doesn't want us to deploy Clog to the business, which I agree, I don't want to either. I told him that was not my intent, but he's agreed that in the live side, in the plant side, and in the sales side, the way our digital transformation team is organized. 
that we could publish an application, a web app. 
through Claude that uses the data lake data that for each one of those sections, so live, plant, and sales. And so my goal right now is to understand if that is, and I'm not convinced it is at the moment, that that's our only route. I think that we still have to think about CRM and how 

 
Zhyrovetska, Khrystyna   25:45 
Mhm. 

 
Dickson, Dustin   25:57 
it interfaces with click and whether or not we stay that route or not. But the goal is then now to take some of the work we've already done and potentially optimize all of the knowledge we have from all the different data sources now and all of the work we've put in. Instead of trying to... 

 
Zhyrovetska, Khrystyna   26:14 
Mhm. 

 
Dickson, Dustin   26:17 
Continue to build on top of click with the limitations of click sense. 
So... 

 
Zhyrovetska, Khrystyna   26:24 
Okay, yeah. 

 
Dickson, Dustin   26:25 
So what I'm trying to understand is this is all the data we have, this is the output we have, and we have the master data app in the middle, right? Where we're managing, which it's ultimately a data source, but it's basically riding the Snowflake to help us support this, right? It's not, we're managing it within click. 
So what I'm trying to understand is where are we at on all of these things so that we, how close are we to then basically taking Claude right here? 

 
Zhyrovetska, Khrystyna   26:49 
Mm-hmm. 

 
Dickson, Dustin   27:01 
Let me go back. 
It's connected to my, this is... 
What is this, VS Studio or whatever, Visual Studio or whatever, but it's connected to Snowflake. 
And. 

 
Zhyrovetska, Khrystyna   27:16 
Mhm. 

 
Dickson, Dustin   27:18 
I wanna understand what work is required if we wanna take this approach, meaning let me log in to Snowflake real quick. 
So when we look at the data lake itself, 
I don't know what all this is. Maybe you have better familiarity with it, but... 
For instance, when I go to the Circana data, for instance, let's see. 
Here. Which one of these tables really does the application, which one of these folders do I need to use to build an end user application, right? And how do we segment it to where if... 

 
Zhyrovetska, Khrystyna   28:10 
Mhm. 

 
Dickson, Dustin   28:13 
If we put a handful of people on a project to build out a complete control tower for sales, then 
which ones do we use, right? How do we navigate this and et cetera? What's done, what's not done, what is just raw layers versus gold layers or whatever we call it? Where are we at on each one of those and how close are we to actually being able to say, you know, 
In this right here, saying... 
AU. 
I want to build, so for instance, here's one thing I did, Khrystyna, with this tool is... 

 
Zhyrovetska, Khrystyna   28:55 
Mhm. 

 
Dickson, Dustin   28:56 
One of the questions was analyze the frozen chicken trends and it gave me this, right? This is nothing new. We've seen this. You guys did a pilot on this, right? Which was one of me and Leo's questions was that tool, I don't know what, I don't remember exactly what we used when we engaged with Advantis on that 

 
Zhyrovetska, Khrystyna   29:07 
Yu. 

 
Dickson, Dustin   29:18 
pilot, what tools we use. But what we're promoting from Pilgrims JBS side is to build that, to have that tool in-house in Claude, that what you're looking at right here would be available to my team and the developers on this call, including maybe, and including members of my team. 
And Lili. 
But in order to use this, I have to understand, where I have to understand, you know, how long will it take, or where are we at on all of this? 

 
Zhyrovetska, Khrystyna   29:42 
Mhm. 

 
Dickson, Dustin   29:51 
What do we need to do to these folder structures to make it to where we clearly understand what we're doing? How do we engage you guys in the other, the folks that did the ETL to make sure that we're looking at this the right way? 
And then how do we know what the total scope is, right? So that's where I'm starting is, where are we at on all of these pieces? What do we need to focus on if we want to use a tool like this? I got a huge push to do the P&L 2 weeks ago. 
So, we'll... 
We'll be looking at that, but I guess that's my first point, Christina, is we need to get an understanding of where we're at on. Is this comprehensive? And then what is our strategy around analytics? Because I think what I'm trying to understand is... 

 
Zhyrovetska, Khrystyna   30:30 
Mhm. 

 
Dickson, Dustin   30:42 
How do we? How do we? 
How do we not be limited by click? I see click as being a very slow progression in development. Do you agree compared to Claude or something? 

 
Zhyrovetska, Khrystyna   30:58 
Of course, Ploog provides much more. 
could provide much more insights. Of course, we don't need to do all of this custom reports for one person in a 100-man department. 

 
Dickson, Dustin   31:04 
Direct. 
Right, and I think that that's um... 
That's what Lili was trying to convince me with the pilot with the tool on that you guys showed us before the beginning of the year, right? 

 
Zhyrovetska, Khrystyna   31:26 
Mm-hmm. 

 
Dickson, Dustin   31:27 
Two things. I don't think I was ready. I don't think I understood the capability. And now I still don't know everything, but I am bought in that click is too slow. And I don't think we'll ever get there with just click apps in a timely manner. And now that we have 

 
Zhyrovetska, Khrystyna   31:45 
Hello. 

 
Dickson, Dustin   31:48 
enough resources and the right understanding of the business, meaning we know that this is the data that would ultimately provide a P&L. We know more about how this data integrates with each other and what the business ultimately needs out of it. 
Plus we have the dynamic system in place. So we've kind of come to a point where that system is stabilized, at least from the master data standpoint. I know we got a few things, but, and then getting that data back is beginning. So now we're not so focused on that analytics and those in that data source or that project. 
So now we can focus a little bit more time on developing out what we need from all these different things. So let's go through this, if you don't mind, and just kind of give me from that perspective, where are we at on every one of these and who owns it, right? So I think the Circana data still 

 
Zhyrovetska, Khrystyna   32:40 
Mhm. 

 
Dickson, Dustin   32:53 
The knowledge transfer may have been there, but... 
Fellipe is really the one still working on those two, is that correct? 

 
Zhyrovetska, Khrystyna   33:06 
Like, we are not actively working on it, so it's only the part where we need to migrate to DBT. This part you can put to Phillip, like assign to Phillip and Notta, but on the Srujan brand level, we don't do anything, so... 

 
Dickson, Dustin   33:27 
Okay, so this, that's what I want to get to in. 
I think what I want to make sure is between you, Khrystyna, and Leo, today that we walk away understanding who's owning what and who's working on what, and we make some decisions today so that it's clear. And that way, because what Lili and I are trying to figure out 

 
Zhyrovetska, Khrystyna   33:46 
Mhm. 

 
Dickson, Dustin   33:54 
Full transparency, Khrystyna, is how do we, with all of the knowledge that you have from the last two years of being, or I don't know how long, but it's been almost two, I think, on these, on this, we don't want, we want to find a way to try to keep you on board to help us through. 

 
Zhyrovetska, Khrystyna   34:04 
Mhm. 
Mhm. 

 
Dickson, Dustin   34:12 
All of the knowledge that you have in terms of these data sources and the business itself. I think that will, we're going to need as many resources as we can on that side. So. 

 
Zhyrovetska, Khrystyna   34:25 
Mhm. 

 
Dickson, Dustin   34:25 
From that perspective, I'm trying to figure out what is the right way to handle Vix's responsibility versus likely having you on his support as well and still continuing to keep Fellipe because he has the level of granularity on the ETL of all of these data sources and we know he's a good developer. 
Right? So that's what I'm trying to unlock here for everybody so that there's no confusion of, well, Christina's doing this and then that unlocks Bix to say, okay, I clearly own this part, let's run. Here's how Christina, here's how we can leverage Christina. Here's in that every way, everybody has a role. 

 
Zhyrovetska, Khrystyna   34:45 
Yu. 

 
Dickson, Dustin   35:03 
Put it that way. 

 
Zhyrovetska, Khrystyna   35:05 
Mhm. 

 
Dickson, Dustin   35:05 
So, so that's what I'm trying to do here. So, let's go. So, nobody started on the ETL, right, of Circono brand level, and nobody has started on, and so we need to develop the ETL for MPD as well, right? 

 
Zhyrovetska, Khrystyna   35:14 
Yes. 
Ohh. 
Actually, for NPDU, the data is already in Snowflake, so we are bringing the data from the NPD platform to Snowflake, but it's just... 
I don't know. I think we need to involve here. Maybe Phillip, because we don't have any ETL process. We don't have any like gold layer. We just have the raw data in Snowflake. How flexible it is and how ready it is for querying in cloud, I don't think it's really ready. 

 
Dickson, Dustin   35:40 
Yeah. 
Yeah. 
I agree, so let me let me understand: the Circono brand level is a API. 

 
Zhyrovetska, Khrystyna   36:05 
We received this data via data share functionality in Snowflake. 

 
Dickson, Dustin   36:11 
Hey, so it's snowflake to snowflake. 

 
Zhyrovetska, Khrystyna   36:14 
Yep. 

 
Dickson, Dustin   36:16 
Right, and then same thing with the skew level, right? 

 
Zhyrovetska, Khrystyna   36:20 
Yeah. 

 
Dickson, Dustin   36:21 
How about MPD? What is the... 

 
Zhyrovetska, Khrystyna   36:25 
It's the RPA team is running a bot that brings data to Snowflake. 

 
Dickson, Dustin   36:35 
Which ones do we have bots on for store level data versus something different? Are they all with bots? 

 
Zhyrovetska, Khrystyna   36:46 
I think except Publix or maybe Leonardo, you have some updates in the last months. 

 
Contezini, Leonardo   36:53 
We are developing bots for Walmart and Samples. We're just waiting for the 2FA bypass. For Publix, we have 2FA. It's configured to Jacob's account. 
Let me see here. 

 
Zhyrovetska, Khrystyna   37:10 
But do you log on the data for publics? Because... 

 
Contezini, Leonardo   37:13 
No, not yet. Yeah, we're focusing on the others. 

 
Zhyrovetska, Khrystyna   37:14 
E. 
Yeah. 

 
Dickson, Dustin   37:17 
But the goal is to create a bot for Publix, right? 

 
Contezini, Leonardo   37:23 
I, we didn't check that yet, but yes. 

 
Zhyrovetska, Khrystyna   37:24 
Yes. 

 
Dickson, Dustin   37:26 
Good. 

 
Zhyrovetska, Khrystyna   37:28 
For all store level data, the goal is to bring the data via the bot. It's just the public's was the last one, so I think Lisa didn't have a chance to work on it. 

 
Dickson, Dustin   37:32 
OK. 
Okay. 
What about historical sales? So, the owner there has historically been... 
42 data labs, right? But... 
We, uh, did you take, did, did it, did Fellipe take that over? 

 
Zhyrovetska, Khrystyna   37:58 
So this table or these tables from the SAP, they are already in Snowflake. We don't do any data transformations there. So for our analytic side, we just use the already existing tables in Snowflake. 
I don't know which team updates them. 

 
Dickson, Dustin   38:16 
And. 
OKOK. 
So it is that connection to Snowflake VW to Snowflake. 

 
Zhyrovetska, Khrystyna   38:22 
But there is... 
I think so, yes. 

 
Dickson, Dustin   38:32 
And as far as we know, 
This one is complete. 

 
Zhyrovetska, Khrystyna   38:40 
Yes, but again, for cloud integration, when these tables were migrated to DBT, all of the column names have been changed like to not user-friendly ones, I'd say. So it's really hard to understand what each column means. So I don't think in. 
the way in which this profitability analysis tables exist now, it would be working well in Claude. We would need to provide very good instructions for Claude, like, for example, what column Z of mod 0 wrap means, because no one really understands it. 

 
Dickson, Dustin   39:20 
At. 
OK, what about redistributor report? How do we get that into Snowflake? 

 
Zhyrovetska, Khrystyna   39:47 
Ohh. 
It was also already existing in Snowflake. 
Yeah, I would need to check with Phillip because there is already a table in Snowflake that we take and we just... 
Created an ETL flow. 
Like this golden layer tables for the redistributor sales. 

 
Dickson, Dustin   40:14 
Lili. 
Fellipe currently owns that. 

 
Zhyrovetska, Khrystyna   40:19 
Yeah. 

 
Dickson, Dustin   40:20 
Same thing with operator purchasing file. 

 
Zhyrovetska, Khrystyna   40:24 
Yeah, operator purchasing, it's from Flexmith, I guess. So those are Excel files that are shared to our DT integration email every Tuesday. And every Tuesday, we load this Excel files to Snowflake. It's been done automatically. 

 
Dickson, Dustin   40:54 
Okay, and Microsoft Dynamics accounts, Fellipe is working on those. 
Or, no, this was this was Marcio, yeah. 

 
Zhyrovetska, Khrystyna   41:04 
Actually, Marcio Steam. 

 
Dickson, Dustin   41:22 
And... 
We don't know, need DTL. 

 
Zhyrovetska, Khrystyna   41:33 
E. 
I think we would, because it's again just raw data from dynamics, so... 

 
Dickson, Dustin   41:45 
Oh, David, okay. 

 
Zhyrovetska, Khrystyna   41:46 
Yeah, it's either we would need ETL and to transform this data or we would need to provide some very good instructions to Claude what this data means. 

 
Dickson, Dustin   41:56 
You know how, how we get that data? 

 
Zhyrovetska, Khrystyna   42:02 
via Fivetran. 
They copy all of the tables from Dynamics to Snowflake. 

 
Dickson, Dustin   42:17 
Agreements. 

 
Zhyrovetska, Khrystyna   42:20 
Agreements, it's the same way as operator purchasing file, so Excel to Snowflake. 
And there is actually one more data source on CRM side. It's action data. We have four reports in there. 
They are currently being in development. 

 
Dickson, Dustin   42:56 
What's the data source there? Or how do we get the data there? 

 
Zhyrovetska, Khrystyna   43:01 
Yeah. 
I think also Snowflake to Snowflake is it's actually action team who's doing that. They should have set up the connection and bring the data to our Snowflake. 

 
Dickson, Dustin   43:12 
Okay. 
What are we getting from them, the sales pipeline? We're getting the sales. 
Or is this the one where we're getting the actions or whatever we call it? 
Their tasks, and then their, and then... 

 
Zhyrovetska, Khrystyna   43:33 
Activity call, market management reports. 

 
Dickson, Dustin   43:35 
Yeah. 
And it's two of them, right? It's the activities as well as the opportunities. 

 
Zhyrovetska, Khrystyna   43:48 
Yu. 

 
Dickson, Dustin   43:51 
And who's managing that right now? 

 
Zhyrovetska, Khrystyna   43:57 
Phillip. 

 
Dickson, Dustin   44:00 
OK. 
Budget. Have we done anything with budget? 

 
Zhyrovetska, Khrystyna   44:10 
And just loaded it into Snowflake 'cause it was. 
some file, just an Excel file that will be shared. 
It was loaded one time, so... 
It needs to be revised and updated, so we need to develop ETL there. 

 
Dickson, Dustin   44:31 
And then, who's responsible for that? 

 
Zhyrovetska, Khrystyna   44:36 
Phillip, for all of the piano. 

 
Dickson, Dustin   44:40 
We done anything with costs. 

 
Zhyrovetska, Khrystyna   44:45 
Mm. 
Let me see if it's been updated. I think like all of these tables, it was just loaded once and currently they are not being updated. 

 
Dickson, Dustin   45:26 
Leonardo, does this help? 

 
Contezini, Leonardo   45:29 
Yes, it does. It helps A lot. 

 
Zhyrovetska, Khrystyna   45:36 
Let me check in more detail regarding the PNL, but... 
Yeah, I don't think that it's really ready for... 
Claude. 
I would need to, yeah, revise if the data is being updated. 

 
Dickson, Dustin   45:52 
I think. 
But. 
The sales should come from here, right? This is the same thing, that sales and that sales. 

 
Contezini, Leonardo   46:00 
Yes. 

 
Dickson, Dustin   46:06 
Khrystyna, in your mind, there's no difference, right? So, really, the only difference in P&L is the budget and the cost. 

 
Zhyrovetska, Khrystyna   46:07 
Yes. 
Yeah, that's right. This actual table, it was just built for analytics because we needed just a few fields from. 

 
Dickson, Dustin   46:17 
Okay. 
Da. 

 
Zhyrovetska, Khrystyna   46:26 
Profitability analysis and also few fields from master material tables, so. 

 
Dickson, Dustin   46:31 
Okay. 

 
Zhyrovetska, Khrystyna   46:32 
We build a separate table just specifically for piano. 

 
Dickson, Dustin   46:39 
So... 
Leo, have you seen all of these applications? 

 
Contezini, Leonardo   46:47 
No, I saw the sales performance app after our conversation with the 42 Data Labs team. We saw market insights, but I didn't saw the other ones. 

 
Dickson, Dustin   47:02 
Okay. 
And we have store level data. So we have, we're missing the store level data over here, right? 

 
Zhyrovetska, Khrystyna   47:16 
Mhm. 

 
Dickson, Dustin   47:18 
Thing that one, right? 

 
Zhyrovetska, Khrystyna   47:21 
Sure. 

 
Dickson, Dustin   47:24 
So... 
Looks like, have you seen the Master Data app? 

 
Contezini, Leonardo   47:34 
Yes, yes, I think so. 

 
Zhyrovetska, Khrystyna   47:34 
Flow. 
Yeah? Okay. 
Maybe it just wasn't me who showed, but... 

 
Contezini, Leonardo   47:41 
Yeah, maybe I saw it when I was just discovering the apps. 

 
Dickson, Dustin   47:47 
OK, so. 
I think the discussion I want to have, Khrystyna, is... 
And, and... 
Leo is, so we have... 
I'm gonna just put... 
Always screw it up, Khrystyna. 
It works. 
It is Fellipe 2 L's. 

 
Zhyrovetska, Khrystyna   48:26 
And. 

 
Dickson, Dustin   48:28 
Peas or two, it's two something. 

 
Zhyrovetska, Khrystyna   48:29 
Yeah. 

 
Dickson, Dustin   48:32 
Okay, but so we have... 

 
Zhyrovetska, Khrystyna   48:34 
You mean his surname or? 

 
Dickson, Dustin   48:37 
Yes, his first name. Well, how do you spell his first name? 

 
Contezini, Leonardo   48:42 
His first name is Fellipe with two L's. 

 
Zhyrovetska, Khrystyna   48:42 
Uh, yeah, yeah, it's correct, Phillip. 

 
Dickson, Dustin   48:45 
Yeah, OK. All right. 
So, we have Fellipe. 
We have the equivalent of Fellipe is... 

 
Zhyrovetska, Khrystyna   48:56 
Rodrigo, I guess. 

 
Contezini, Leonardo   48:57 
For my team, Rodrigo. 

 
Dickson, Dustin   48:57 
Remind me. 
Rodrigo, yes. 

 
Contezini, Leonardo   49:00 
Yes. 

 
Dickson, Dustin   49:02 
And then we have, what's the Viaga? 

 
Contezini, Leonardo   49:06 
Vitor. 

 
Dickson, Dustin   49:08 
People. 

 
Contezini, Leonardo   49:08 
Vitor. 

 
Dickson, Dustin   49:09 
And then we have not to, right? 

 
Zhyrovetska, Khrystyna   49:13 
Yu. 

 
Dickson, Dustin   49:18 
And we are adding another guy here, right, Leo? 

 
Contezini, Leonardo   49:23 
Yes, another Fellipe with two Ls. 

 
Dickson, Dustin   49:28 
Okay. 

 
Contezini, Leonardo   49:29 
Yeah. 

 
Zhyrovetska, Khrystyna   49:29 
Da. 

 
Dickson, Dustin   49:29 
Right, Phillip One, Phillip Two. 
OK, so. 
Khrystyna, my. 
Don't do this. 
I think from our security standpoint, we have we have to figure out a way to define the the the deadline for NADA, just because. 
They won't let us have, they won't let you guys have access to our system, and without access to our system, Nada can't do her job, right? 

 
Zhyrovetska, Khrystyna   50:04 
Yep. 

 
Dickson, Dustin   50:06 
So I think we need to have a plan. 

 
Zhyrovetska, Khrystyna   50:06 
Yeah. 

 
Dickson, Dustin   50:10 
With this, as to when do we, when does Nada need to? 
What is not working on and when can we let that part go? 
So that's one decision, right? 
Then, Vitor. 

 
Zhyrovetska, Khrystyna   50:26 
Yeah. 

 
Dickson, Dustin   50:28 
Correct me if I'm wrong, Leo. Vitor has expressed that, yes, he's a Click developer, but he can also help us with Clog. 

 
Contezini, Leonardo   50:37 
Yes, yes, for sure. He's been working with another BI tools and also AI tools to create visualizations, like especially Claude. 

 
Dickson, Dustin   50:44 
Okay. 
All right, and then we have another guy. 
Lippy 2 is the data architect. 

 
Contezini, Leonardo   50:56 
Yes. 

 
Dickson, Dustin   50:58 
OK, so would you put him above in terms of knowledge of Rodrigo? 

 
Contezini, Leonardo   51:05 
Yes, I would. 

 
Dickson, Dustin   51:08 
Would you consider Fellipe 1 a data architect? 
You guys, either one of you, do you guys consider him a data architect or no? More of a data engineer? 

 
Zhyrovetska, Khrystyna   51:22 
I think more of a data engineer, like Lili was the data architect in our team. 

 
Contezini, Leonardo   51:22 
Oh. 

 
Dickson, Dustin   51:30 
No. 
So, in... 
What do we call you and Leo? Obviously your project managers, but is it more than that? Less than that? What is it? 
Not less than that, but... 

 
Contezini, Leonardo   51:54 
Mm. 
I am a delivery manager as well, but I don't know what's your intent with that. 

 
Dickson, Dustin   52:01 
Okay. 
My question is, I'm trying to evaluate the skill sets that we have on... 
On board already to address. 
All of the work that we have to do, because what I'm considering is, in order to do what I think needs to be done. 
We need to get the best team in place that we can. 

 
Contezini, Leonardo   52:25 
Yeah. 

 
Zhyrovetska, Khrystyna   52:26 
Mhm. 

 
Dickson, Dustin   52:28 
Sam to me. 
Lili cannot be a data architect. 
I need Lili to be a data scientist, and I need her to be a director, not a data architect for sales projects. 

 
Zhyrovetska, Khrystyna   52:45 
Mhm. 

 
Contezini, Leonardo   52:49 
Phillip, you can can cover Lili Dustin for sure. 

 
Dickson, Dustin   52:55 
Right, that's what I'm thinking is that, so this is what happens here, right? 
We don't have this, and Fellipe covers that. 

 
Contezini, Leonardo   53:06 
Yeah. 

 
Dickson, Dustin   53:06 
Now we lose not to, now that puts a lot of... 
A lot of pressure on Vitor to be the only one. I don't know if that's okay or not, but I'm just looking at all of the different things here. 
I know Claude is powerful, but should we have more than one person, or does it maybe get more confusing if you have two people trying to do one thing in Claude? 
I don't know yet, right? I'm just trying to go through the questions we may have, right? When we have two data engineers, is that enough with an architect? So I'm assuming that architect can also do data engineering as well, if necessary, right? 

 
Contezini, Leonardo   53:34 
Yeah. 
Yes, you can. 

 
Dickson, Dustin   53:52 
So, is 3 people enough for the pipeline we have? 
I mean, it's a great start, right? We don't know what we don't know. 

 
Contezini, Leonardo   54:01 
Yes, I think we can feel it for us regarding the data engineers and also the Vitor role. 

 
Dickson, Dustin   54:05 
Yeah. 
Okay. So, Khrystyna, I think where you would be a good fit, we don't need two project managers, right? Necessarily, I don't think so. But where I think where I think you would fit better is working with me and Vitor. 

 
Contezini, Leonardo   54:10 
Yep. 

 
Zhyrovetska, Khrystyna   54:21 
Mm. 

 
Dickson, Dustin   54:31 
Online. 
Da. 
understanding of how to represent all of this data, if that makes sense. You're probably the one that has the most knowledge across all of this as to how the business uses it, right? 

 
Zhyrovetska, Khrystyna   54:48 
Mhm. 

 
Dickson, Dustin   54:49 
So, I'm just asking you guys to think about... 
I definitely don't want to lose Khrystyna, because then we all that knowledge walks out the door. 
But if there's not a role, there's not a role, right? So if we don't, I don't want, Christina, I want you to stay challenged and everything, and I want to make sure that it's the right fit for you. But at the same time, I don't want to lose you either. So I'm asking everybody to kind of think through what's the best team structure, knowing that 

 
Zhyrovetska, Khrystyna   55:09 
Mhm. 

 
Dickson, Dustin   55:17 
And Leo, knowing that Fellipe and Khrystyna do not work for Mix, right? 

 
Contezini, Leonardo   55:24 
Uh-huh. 

 
Dickson, Dustin   55:25 
I don't think that's a problem, but you tell me. So... 

 
Contezini, Leonardo   55:28 
No, no, it's not a problem. Can I give my opinion real quick? I really believe that we need a as-is map, as I showed you yesterday, to understand all of this data, and then we can draw a to-be map. So we are going to spend a lot of energy. 

 
Dickson, Dustin   55:30 
Yu. 
Yes, go for it. 
Yeah. 

 
Contezini, Leonardo   55:48 
join those maps and I think Khrystyna can really help us understand the stakeholders and the data sources. And also we need to put a lot of energy into the validation to each of these data sources. So that's another point where Khrystyna can really, really help us. 

 
Zhyrovetska, Khrystyna   55:50 
Yeah. 

 
Contezini, Leonardo   56:09 
Because she knows everyone, she knows the environment, so makes it much easier, right? I don't know if Khrystyna, if you agree with me. 

 
Dickson, Dustin   56:09 
Okay. 

 
Zhyrovetska, Khrystyna   56:21 
In general, yeah. 
Two. 
Yeah, with those two years that I work with Pilgrims, I like to build all of these projects, so obviously I know how we build them and how the business stakeholders use the data, so... 

 
Contezini, Leonardo   56:41 
Yeah. 

 
Zhyrovetska, Khrystyna   56:41 
I think I would be able to help you with. 
I help the the data architect to understand what's the nature of data, how it should be going through the ETL, what the golden layer should look like, and also help the Vitor help Vitor to understand, like, what are we building on the BI side, what data needs to be represented there. 
So. 
Yeah. 

 
Dickson, Dustin   57:11 
No. 

 
Zhyrovetska, Khrystyna   57:14 
I think in one word that role could be named as a business analyst. 

 
Contezini, Leonardo   57:14 
Da. 

 
Zhyrovetska, Khrystyna   57:24 
Yeah, this is the person that knows the business and provides the requirements to the development team. 

 
Contezini, Leonardo   57:24 
Also. 
And also, in order to create visualizations with Claude, we are going to need a proper documentation for all of these data sources and specific rules to each of the measures that the final users want to see. 
All of this information is going to to act as our semantic clip to Claude, so that's another thing we can think of. 

 
Dickson, Dustin   58:07 
So, and I'm assuming Khrystyna and Leo, because we have so many in five different streams going here, right? 
We could leverage Khrystyna for steel project management on some of these as well, or one of these as well, to keep as much, because I think what we're going to end up doing, I want to accelerate all of it, right? So we're going to need more project management. So I think 
I don't wanna lim, I don't wanna say that Khrystyna. 
I don't know, Leo. We'll see how it goes, right? But that's a lot for you to manage at the level of granularity that we're going to need to manage from a project management standpoint. 

 
Contezini, Leonardo   58:57 
Yeah. 

 
Dickson, Dustin   58:58 
not underestimating your ability, just saying that's a lot. So, but then I think, so if we say, if we look at this right here, right, this is our big gap. 

 
Contezini, Leonardo   59:01 
Of course. 

 
Zhyrovetska, Khrystyna   59:13 
Mmh. 

 
Dickson, Dustin   59:13 
Right, because Khrystyna, no matter if I go the clawed route or not, I still need a click developer. 
to support what we've already done in CRM. Do you agree? 

 
Zhyrovetska, Khrystyna   59:30 
Yes, because it's already in the production application. 

 
Dickson, Dustin   59:35 
Right. 

 
Zhyrovetska, Khrystyna   59:35 
And it would still take some time to set up the quad and I think the sales manager, it would be good to show them progress now. 
with the CRM app, like to develop all those monthly reports that they wanted to see, etc. Because it would take some time to configure Claude. 
So we need to run in parallel, like to keep supporting the CRM app in Click while we are building Claude. 

 
Dickson, Dustin   1:00:01 
Da. 

 
Zhyrovetska, Khrystyna   1:00:09 
And then migrate to code. 

 
Dickson, Dustin   1:00:10 
So, I see our gap here though, guys, as being we don't have a replacement for not to if we're going to use Vitor for. 
A different approach. 
I don't think we can have Vitor working on dynamic or CRM click dashboards and trying to keep up with what we want to do in Claude. 
I think that's immediately, that's going to immediately become a problem. 

 
Contezini, Leonardo   1:00:38 
Mm. 
I see two options here. We can bring a data, an AI engineer to complete Victor's role where he is right now, I mean, in AI, and put him in as a Qlik developer, or we could bring another Qlik developer and keep Victor. 
Working with AI, that's up to you. 

 
Dickson, Dustin   1:01:06 
I think the question I would ask you, Leo, is can you do a little bit of thinking about is Vitor, do we, is there somebody in this space that would be better than Vitor and that way Vitor would not be the owner of that? Or if Vitor is the one that we think is the best at that, then I would replace the click developer. 

 
Contezini, Leonardo   1:01:26 
Okay, I can think about that and bring this information to you as soon as possible. 

 
Dickson, Dustin   1:01:32 
The other option we could have is a click developer. 
could come from 42 Data Labs. I don't think that's the right approach, but they have quite extensive background in click development. We're going to be having the same conversation I'm having with you guys right here with the scope and then the team. I'm going to be having that with Ian. 
Soon, because all of the people that he has in BI, I'm going to want now. 
moving towards the AI part. And he's on board with that, but they may have a developer or two that... 

 
Contezini, Leonardo   1:02:09 
Mmh. 

 
Dickson, Dustin   1:02:15 
could help us with BI if we don't want to go get someone else if we want to focus. But again, the reason I say that, Leo, is only the only the reason the only reason I say that is because click is sometimes difficult to find a good developer. 

 
Contezini, Leonardo   1:02:30 
Yes, mhm. 

 
Dickson, Dustin   1:02:31 
So if we need, I know 42 Data Labs has good click developers. So if we don't want to hit the headache of finding a good click developer, because one thing we cannot do is get the wrong click developer for CRM, because we got to keep that project going. 

 
Contezini, Leonardo   1:02:50 
Mhm. 

 
Dickson, Dustin   1:02:51 
So if we want to move someone from 42 Data Labs in that spot, then I can ask Ian to do that, and then we can focus mainly on developing a larger team around the AI part. 
And one other thing is, Leo, is I don't have really any resources right now dedicated to the plant area of the business, the production side. 
42 Data Labs is mainly handling corporate and... 
Corporate level analytics, as well as... 
Live analytics, and they have no, they cannot expand very fast anymore. We've taken almost everybody they got. 
So, the I see the room for growth with Bix potentially being in the plant side. 

 
Contezini, Leonardo   1:03:39 
OK. 
Mhm. 

 
Dickson, Dustin   1:03:46 
Not necessarily more. What I'm saying is I'm not sure that the growth should come from a click developer when we're, you know, if you look at it from a big standpoint, I'm not sure we're going to grow a lot of click development in this lane. So adding a 42 data labs here just to fill the gap for the short period might help us 
Grow bigs in other areas faster. 

 
Contezini, Leonardo   1:04:10 
Mhm. 

 
Dickson, Dustin   1:04:11 
So just be thinking, just think about that. That's all I'm asking is because we've got to figure out a strategy for Nata to, out of respect for her, we need to give her some notice and we need to, and I guess we can talk about this offline, Christina, but I would like to give her as much notice as possible and 

 
Zhyrovetska, Khrystyna   1:04:29 
Mhm. 

 
Dickson, Dustin   1:04:31 
Make sure she's aware that this is the plan. Make sure we're clear with her that this is the plan. She's done a great job for us. I don't wanna, I wanna do what's right for her. 

 
Zhyrovetska, Khrystyna   1:04:39 
Yep. 
Mhm. 
Okay, yeah. 

 
Dickson, Dustin   1:04:44 
But that. 

 
Zhyrovetska, Khrystyna   1:04:46 
Discuss on the dates. 

 
Dickson, Dustin   1:04:49 
Okay. All right. So I know this may not have been the intent of your meeting, Christina, but I feel like it's very important that we get this alignment quickly so that we can kind of finish the knowledge transfer and make sure everybody has their own role so that we're not overlapping and slowing down. 
Lili will be back on the 22nd by the time she gets back. 
I want us to be running with this, if possible. 

 
Zhyrovetska, Khrystyna   1:05:15 
What? 
Mm-hmm. 
Okay, so we need to continue the knowledge transfer on master data, on dynamics, analytics and data integration and PNL. So these are the three apps that we did not cover yet. 

 
Dickson, Dustin   1:05:37 
So. 
I would, I would ask this, OK, and and I want you and Leonardo to think about this. 
How much knowledge transfer is really needed? 
What level of what, what exact knowledge transfer is needed to support this team structure, because if Fellipe is staying on and we're gonna, I believe, Phillip his name may be on too many things here. 

 
Contezini, Leonardo   1:06:01 
Mhm. 

 
Dickson, Dustin   1:06:03 
So we need to figure out which one of these does Fellipe need to let go and give to the rest of the team and then do heavy knowledge transfer on that one, whether that's Circana, whether that's internal data, whatever it is, we just need to think about which one would be the most 

 
Zhyrovetska, Khrystyna   1:06:16 
Mmh. 

 
Dickson, Dustin   1:06:22 
To me, because the store-level data. 
is taken over by Bix, it may make sense that they take over the market data as well. But Khrystyna, you know better than I do on the complexity of the market data and whether or not Fellipe is probably needed to stay there. Where would, I would say that Fellipe has the most experience and the most understanding of what we're doing. 
We need to put him on some of the more complex tasks at the moment. 

 
Zhyrovetska, Khrystyna   1:06:55 
Mmhm. 
So yeah, the most, the two most complex ones are market data and CRM project. 

 
Dickson, Dustin   1:07:05 
Yeah. 

 
Zhyrovetska, Khrystyna   1:07:06 
Oh. 
So we can assign him to these projects and all of the rest. 

 
Dickson, Dustin   1:07:08 
So, what? 
Here's what I would... 

 
Zhyrovetska, Khrystyna   1:07:14 
Hand over to Bix. 

 
Dickson, Dustin   1:07:16 
Here's what I would say: then we need to... 
This one is going to take heavy involvement of interfacing with the business. 
Do you agree, Christina? So when I go to Greeley next week, I'm going to propose to them that we start a discovery process on the P&L, as the way they do it today. 

 
Zhyrovetska, Khrystyna   1:07:29 
Mhm. 
Okay. 
Mhm. 

 
Dickson, Dustin   1:07:41 
Do I need to figure out? 
Who's going to interface with them? So who's the who's the developer, who's the data engineer, and who's the PM? 

 
Zhyrovetska, Khrystyna   1:07:53 
Mm-hmm. 

 
Dickson, Dustin   1:07:54 
No. 
Would it make sense to you guys? 
I'm just proposing stuff, guys. Just tell me if you have a different opinion. Speak now. But to me, it would make sense that we keep these together on this project. We take Bix and Leo is here. 

 
Zhyrovetska, Khrystyna   1:08:06 
Da. 

 
Dickson, Dustin   1:08:18 
And then when Rodrigo is here, right? 

 
Zhyrovetska, Khrystyna   1:08:18 
Mhm. 

 
Contezini, Leonardo   1:08:22 
Mhm. 

 
Dickson, Dustin   1:08:30 
The historical sales data, this is all feeding into dynamics, right? 

 
Zhyrovetska, Khrystyna   1:08:39 
Mm. 
Historical sales data, yes, but sales pipeline, Dynamics accounts and opportunities, this is something that we are getting out of Dynamics. 

 
Dickson, Dustin   1:08:41 
All. 
Do you think? 
That, that should... 

 
Zhyrovetska, Khrystyna   1:08:56 
But it's still related. 

 
Dickson, Dustin   1:08:59 
Did that move to Bix in your opinion? It's still related, that's the point. 
So the decision really comes down to... 
If we do P&L here, there's Fellipe, and then we got Fellipe all across here, right? Which one do we need to take off of Fellipe? 

 
Contezini, Leonardo   1:09:21 
I would take market data because we already did all the knowledge transfer sessions. We can understand the scope there. 

 
Dickson, Dustin   1:09:30 
I tend to agree because he's already done there and we're starting fresh on the raw data on MPD. 

 
Zhyrovetska, Khrystyna   1:09:37 
Mhm. 

 
Contezini, Leonardo   1:09:43 
And of those two? 
I would say Bix should have historical sales data because we've already talked to for two data labs team. We can talk to Fellipe to understand the scope as well, but we do not have any context on the sales pipeline. 

 
Dickson, Dustin   1:09:55 
Yeah. 
In terms of these three here, Khrystyna, can we pass those two? 
Rodrigo, at this point. 
In your opinion, are they at a point now where we don't? 
We are not doing much with them. 

 
Zhyrovetska, Khrystyna   1:10:26 
No, we are actively working with them and we need to move all of the logic from click to Snowflake. So I would rather have Phillip finish it and maybe after it transfer to Rodrigo, but let's. 
Keep Phillip on it until we finish, because Phillip already knows all of this logic, so he will just finish it much faster. 

 
Dickson, Dustin   1:10:44 
OK. 
Okay. 
No. 
All right. 
So, Khrystyna, I guess my last question would be, do we really think you can handle the dynamics piece and this piece? 
and PNL or should we, because what I look at is, and Leo helped me understand. 
What Flippy 2 can do, he's not going to be a business-facing person, right? 

 
Contezini, Leonardo   1:11:35 
That's not the goal, but he can do it as well. 

 
Dickson, Dustin   1:11:40 
Okay. 
What I would tend to think here, Khrystyna, is this one needs to be... 

 
Zhyrovetska, Khrystyna   1:11:57 
Mhm. 

 
Dickson, Dustin   1:11:59 
And then we leave it like this right here, because I think, Khrystyna, what we need to do is keep you free enough to answer questions for these guys. 

 
Zhyrovetska, Khrystyna   1:12:11 
To call you. 

 
Dickson, Dustin   1:12:13 
And then, until we get them. 

 
Zhyrovetska, Khrystyna   1:12:14 
Okay. 

 
Dickson, Dustin   1:12:17 
I don't know, Leo, what your thoughts are, but that way Khrystyna has enough time to support everybody in each one of these. 

 
Contezini, Leonardo   1:12:23 
Yes. 
I agree. 

 
Dickson, Dustin   1:12:31 
I don't know if she has enough time. She's still got a heavy workload, but at least we get, at least it's not. 

 
Zhyrovetska, Khrystyna   1:12:37 
Yeah. 
Yeah, I think it will be probably changing because it's like, at one point of time, we'll be working more heavily on one side of projects than it will change. I don't think that we will work equally on each of the projects, like each of the days. 

 
Dickson, Dustin   1:12:49 
Right. 
Right. 

 
Zhyrovetska, Khrystyna   1:12:57 
We'll see, but one comment from my side regarding the data architect. For him to be really, to really be a data architect, he needs to be involved in all of the project. Otherwise, he just won't know the bigger picture. 

 
Dickson, Dustin   1:13:13 
Okay, then maybe. 

 
Zhyrovetska, Khrystyna   1:13:13 
and whatever he architects within P&L project, it should fit into the bigger picture of the whole data lake. 

 
Dickson, Dustin   1:13:22 
Okay, so... 

 
Contezini, Leonardo   1:13:22 
I agree with you, Khrystyna. 

 
Dickson, Dustin   1:13:24 
So maybe the wrong, I should not put him here, I should put the data architect. 
On all of these is Phillip you too, right? 

 
Contezini, Leonardo   1:13:41 
Mhm. 

 
Zhyrovetska, Khrystyna   1:13:41 
Yeah. 
And if he has some spare time to develop things, then I think we'll just see. 
Whatever project would need most help. 
And then he could just develop some tasks as well. 

 
Dickson, Dustin   1:14:03 
Did you say you needed Jacob on here, Christina? 

 
Zhyrovetska, Khrystyna   1:14:09 
Yeah, just to check with him if he has any questions on CRM, because he usually does. 
And it was like our time to think with him, but I also have a meeting with him at... 
Nine, so I can also sync with him later. 

 
Dickson, Dustin   1:14:31 
Okay. 
Okay, now... 
If I remember correctly. 
We also were looking at a third data engineer, Leo. 

 
Contezini, Leonardo   1:14:47 
Yes, it's correct. Lili already talked to him. 
Uh, it's another Leo, that's what I told you. 

 
Dickson, Dustin   1:14:57 
OK. 
So, if we added Leonardo to... 

 
Contezini, Leonardo   1:15:03 
N. 

 
Dickson, Dustin   1:15:09 
That could take... 
Some load off of Rodrigo, correct? 

 
Contezini, Leonardo   1:15:15 
Correct. 

 
Dickson, Dustin   1:15:16 
That would have Fellipe squarely on historical sales and sales pipeline, Rodrigo on market and store level data, and potentially Leo 2 on P&L or maybe one of the others. 

 
Contezini, Leonardo   1:15:30 
Yeah. 

 
Dickson, Dustin   1:15:31 
Okay. 
Do you think, what is your thoughts, Khrystyna, on adding another engineer? 

 
Zhyrovetska, Khrystyna   1:15:45 
I'm just thinking if we will have enough requirements for all of the team. I just don't want them to be, you know, waiting on us, but maybe that would be a good push for us to move faster with the requirements. So. 

 
Dickson, Dustin   1:16:04 
Yes, I think the... 
Key is, we haven't touched marketing. 
We haven't touched customer service. We have a whole lot of work to do on the plant side. 
And... 
So maybe not in this scope. We don't have, we may not have enough for a third developer to get one on board to help us move through this quickly. And then if we get, as we get more requirements or as we want to move him over, we'll have more work. It's more about. 
Can't we do we think that person would move this faster is is really the question. 
I think we need to try to get all of this in and developed and clean in the data lake. I don't know how long it'll take, but what would you guess, Khrystyna, if we had all these resources? 
Hard to say, right? 

 
Zhyrovetska, Khrystyna   1:17:08 
Is. 
I would still say like a couple of months, like by the end of the year. 

 
Dickson, Dustin   1:17:15 
I said, I would say at least three months to just get the data in there and clean. Now we can work alongside that on what we have to begin developing it out on 
cloud side as we go and potentially have something, you know, late in mid fourth quarter to where we have something ready to deploy or early fourth quarter at best. I think we got to show some progress because Khrystyna, you've said this and I'm hearing this on every side, right? 
What are we doing? All we're doing is putting data in a data lake, right? When are we going to deploy something the business uses? 

 
Zhyrovetska, Khrystyna   1:17:58 
Mhm. 

 
Dickson, Dustin   1:17:58 
Well, we're there now. And I think the key for me is what tool are we going to use? And I think if we would have tried to go this route early on, one, we wouldn't have known enough about the scope of what we're trying to do, and two, we would have chose the wrong tool trying to do this in Qlik Sense. 

 
Zhyrovetska, Khrystyna   1:18:03 
Yay! 
Mm-hmm. 

 
Dickson, Dustin   1:18:23 
To me, it's very clear what we're trying to accomplish now and what level, what data we need. And it's very clear what tool can help us the most. Now, we still have a lot of question marks on Claude and how we deploy that in JBS, but I think we've got to cross that bridge now. 
Because if we try to do this stuff in Click, we'll be here till next year, still talking about dashboards. 

 
Contezini, Leonardo   1:18:48 
Yeah. 

 
Dickson, Dustin   1:18:55 
Okay. 

 
Zhyrovetska, Khrystyna   1:18:55 
And Dustin, there is one more gap that I think maybe someone was in Pilgrims could fill it in. So you probably remember we also have Yu Jen from Advantage, like... 

 
Dickson, Dustin   1:19:10 
Yes. 

 
Zhyrovetska, Khrystyna   1:19:11 
Doing some some tasks for us from time to time. Initially, he was the AI engineer, but then we like he volunteered to fix the issue of authorization between the dynamics and click sense. 
And. 
Mostly, it's just a backend engineer who could write app like this. Everything is already developed, so there is like no... 
tasks in the backlog for this person. But in case, I don't know, something breaks or something needs to be updated, et cetera, we need someone to take this part over. And Eugen has actually involved someone from Pilgrims. 
Um... 
Let me check what his name was. Dileep, I guess. 

 
Dickson, Dustin   1:20:06 
Mhm. 

 
Zhyrovetska, Khrystyna   1:20:08 
But I'm not sure if Dileep could really support on his own disk, because every time when we had some questions, whenever like we added a new page to the app, so we needed to add this link to the authorization part, Dileep couldn't do it by himself, and we always had Eugen to go on a call with him to fix this. 
So I think we need just to find. 

 
Dickson, Dustin   1:20:30 
And this was this was specific to CRM. 

 
Zhyrovetska, Khrystyna   1:20:35 
Yes, just specific integration between CRM and Qlik Sense. So we need some backend engineer who could understand this application that Eugene were developing and supported in the future. 

 
Dickson, Dustin   1:20:52 
What do you think about that, Leo? 
This is a highly technical guy, right, Khrystyna? 

 
Zhyrovetska, Khrystyna   1:21:02 
Yeah, yeah. 

 
Dickson, Dustin   1:21:12 
I don't do, do we need him full-time, Khrystyna? 

 
Zhyrovetska, Khrystyna   1:21:18 
No, not full time, especially now, like when we don't have any scope for him. So like Eugen involved maybe like for 10 hours or so last month. So that's why I'm saying it should be either someone from Pilgrims or I don't know, someone from Leo's team. 
was already there and is like technical. 
So someone we already have in the team and would have enough expertise to cover this. We don't need a separate person for this. 

 
Dickson, Dustin   1:21:54 
Leo, do you guys have anybody like that? 

 
Contezini, Leonardo   1:21:57 
Uh, it's not so clear to me what is Eugene doing right now? 

 
Zhyrovetska, Khrystyna   1:22:06 
So he wrote some web app. There were some issues between authorizing. 

 
Contezini, Leonardo   1:22:06 
Sorry. 

 
Zhyrovetska, Khrystyna   1:22:15 
click iframes within the CRM dynamics. So the analytics was not just showing in the CRM dynamics and how we do like we usually develop the dashboards within click then creating an iframe link for that dashboard and integrate this iframe link to. 
CRM MS Dynamics and the authorization part didn't work, so Eugene wrote. 

 
Contezini, Leonardo   1:22:35 
Mmh. 
Okay. 

 
Zhyrovetska, Khrystyna   1:22:44 
some application, like a separate app that will handle this authorization part. I could ask him actually like in which language he wrote and he could show all of the code. 

 
Contezini, Leonardo   1:23:01 
Yeah. 

 
Zhyrovetska, Khrystyna   1:23:02 
Do you, but yeah, I can get the details from you, John, like in which language he used, but it should be just a backend engineer. 

 
Contezini, Leonardo   1:23:09 
Okay. 
All right. 

 
Zhyrovetska, Khrystyna   1:23:13 
Maybe someone who worked with CRM before. 

 
Dickson, Dustin   1:23:14 
E. 

 
Contezini, Leonardo   1:23:19 
Yeah, if you if you send me the language and the stack, I can definitely check with the software team, but yes, this we have some back end, front end, and or or full stack engineers here. 

 
Dickson, Dustin   1:23:32 
Okay. 

 
Zhyrovetska, Khrystyna   1:23:34 
I think it was just Python, but let me check. 

 
Dickson, Dustin   1:23:40 
That's a different skill set than a data engineer, right? 

 
Zhyrovetska, Khrystyna   1:23:46 
Yu. 

 
Dickson, Dustin   1:23:58 
All right. 
What other questions do we have here? 
Does this help? Does this help Khrystyna at all, or are you confused too? 
As far as... 

 
Zhyrovetska, Khrystyna   1:24:21 
No. 

 
Dickson, Dustin   1:24:23 
Not confused on what we discussed, but more so we need to figure out what the right structure is of blending the two teams. Do you agree? 

 
Zhyrovetska, Khrystyna   1:24:34 
Yeah, I think it actually helps because yeah, for me, within this knowledge transfer meeting, like I need to know in what level of details to go into each of the project within the knowledge transfer because it can take one hour just for general understanding or it can take like. 

 
Dickson, Dustin   1:24:46 
Right. 

 
Zhyrovetska, Khrystyna   1:24:52 
10 hours to explain each table, how it's been updated, what is the meaning of each column, et cetera. So for me, it helps in terms like of knowledge transfer. So the only question that I have is like, first of all, Anata, so that we could set. 
like discuss what scope is left and set the date for her. And then on my side, like, would there be any changes to my permissions? Like Snowflake, would I still get access to Snowflake or Click or no? So, you know, like these details. 

 
Dickson, Dustin   1:25:32 
Yeah, I don't know. I think that's what I've got to figure out, Christina, and full transparency. I don't know if they will push back. 
I'm going to suggest that at minimum you stay on as a project manager with really no access, right? Just help us through. 
the process. That's at minimum. If they will allow us to do other stuff, then we'll go through that and ask them. Well, you know, it'll be pretty granular, the discussion of what exactly. I think the key is that in order to get access, right, you have to be on our network. That was the whole security issue in the 1st place is the IP address. 

 
Zhyrovetska, Khrystyna   1:25:56 
Okay. 

 
Dickson, Dustin   1:26:18 
where the IP address is, right, of the computer. So I don't know what our, I don't know what they will do with this. But either way, if you're interested and we're interested, and we see that this with Leo and everyone else sees that this is a beneficial. 

 
Zhyrovetska, Khrystyna   1:26:24 
Mhm. 

 
Dickson, Dustin   1:26:34 
engagement with you, I would like to try to make it work because I think, you know, you've done an excellent job for us and we've got quite a bit of rd ahead of us. So there's plenty of work left to be done. And I think that you'll be helpful in getting us accelerating this with the right team in place. 

 
Zhyrovetska, Khrystyna   1:26:40 
Yeah. 
Okay, thank you. 

 
Dickson, Dustin   1:26:58 
But we'll see. I'll, I'm really kind of, I'm not planning on making any move until Lili is getting back, gets back. But when Lili gets back, I will need to address this with security. I will need to have a date before then for not to, and we can work through that with Lili even when she's offline or. 
at home. But then for you, I'll need to have a plan. Put it that way, when Lili gets back, we'll present that plan to security and see if they will go for it. 

 
Zhyrovetska, Khrystyna   1:27:30 
Okay, sounds good. 

 
Dickson, Dustin   1:27:32 
Um... 
So, let's talk about Nanta. What specific work is she doing right now? 

 
Zhyrovetska, Khrystyna   1:27:47 
She's mainly working on the CRM application, currently developing monthly reports for the field sales team. 
Um... 
Agreements report. 
on the agreement data that's coming from blacksmiths. And also she's not currently working on it, but she needs to create reports on action data, this call activity, market management, and the other reports. 

 
Dickson, Dustin   1:28:20 
And. 

 
Zhyrovetska, Khrystyna   1:28:22 
Um... 

 
Dickson, Dustin   1:28:23 
Um... 
Hey, let's add this down here, so... 
Did Fellipe do all of this work as well? Fellipe, not Fellipe. 

 
Zhyrovetska, Khrystyna   1:29:34 
And, yes, everything and lost my data. 

 
Dickson, Dustin   1:29:40 
So it's safe to say this is one that we need to include in there, right? And these are not done. So which ones are done and which ones are done on the master data? 

 
Zhyrovetska, Khrystyna   1:29:57 
Ohh. 

 
Dickson, Dustin   1:30:02 
Alright, this one should. 

 
Zhyrovetska, Khrystyna   1:30:02 
I think everything is done in terms of requirements. So we have just one small task like that corporate entity to one of the tables and that's it. But I'm talking in regards to the ready requirements for the development team. 

 
Dickson, Dustin   1:30:19 
And Lili. 

 
Zhyrovetska, Khrystyna   1:30:22 
But I know like we've been talking also on getting those data essential operator IDs. 
And all of this. 
Count Management. 
Oh. 
Process for operators, so yeah, I don't know where are we with this one because we never finalized any clear requirements on this, but the only. 

 
Dickson, Dustin   1:30:43 
Okay. 

 
Zhyrovetska, Khrystyna   1:30:50 
The only one task on the master data that I have for the dev team is just a small task to add 1 column in one table. It's super easy. 

 
Dickson, Dustin   1:31:00 
Okay. 

 
Zhyrovetska, Khrystyna   1:31:03 
Yeah, everything else, it's just... 
If there is any scope, it's not ready yet for development team, so... 

 
Dickson, Dustin   1:31:12 
So, would it be safe to say that? 
She is not working on anything with the Master Data app right now. 

 
Zhyrovetska, Khrystyna   1:31:26 
No. 

 
Dickson, Dustin   1:31:30 
But she is the one that developed it, correct? 

 
Zhyrovetska, Khrystyna   1:31:34 
Yes. 
Like she closed all of the scope that was... 

 
Dickson, Dustin   1:31:45 
OK. 

 
Zhyrovetska, Khrystyna   1:31:46 
Needed from her in terms of master data. 

 
Dickson, Dustin   1:31:49 
Sales Performance App. 
Who, who would? 

 
Zhyrovetska, Khrystyna   1:31:53 
AU. 
So, Nahuz was working on it. It's not ready yet. 
It was in the process of switching to the snowflake tables, because it's currently using some QVDs, UVD files. We need to switch the data sources to snowflake tables. This was like, we started working on it, but... 
I've not finished it. 
So, that's something that another quick dev would need to finish. 

 
Dickson, Dustin   1:32:32 
But just changing the app to point to Snowflake versus QVDs. 

 
Zhyrovetska, Khrystyna   1:32:40 
Yeah, and then afterwards we need to validate the data because you probably remember all of this says performance application. It was like put on hold because one of the business stakeholders said that the data was not right. 

 
Dickson, Dustin   1:32:41 
Hey. 

 
Zhyrovetska, Khrystyna   1:32:56 
Yes, yeah, so it's changing the data source and validating the data afterwards. 

 
Dickson, Dustin   1:32:58 
But. 
Would you say our biggest? 
Our biggest risk right now, if not leaves, is the eye frames. 

 
Zhyrovetska, Khrystyna   1:33:16 
Yes, that's right, because that's what she works on like 100% of her time right now. And we do have some scope that's not yet finished. 

 
Dickson, Dustin   1:33:24 
OK. 
Market insights is on hold, right? 

 
Zhyrovetska, Khrystyna   1:33:33 
That's right. 

 
Dickson, Dustin   1:33:41 
Same thing with PNL and same thing with store level data, right? Or actually store level data is being developed by Vitor. Is that correct? 

 
Contezini, Leonardo   1:33:52 
Yes, it is. 

 
Zhyrovetska, Khrystyna   1:33:52 
Yep. 

 
Dickson, Dustin   1:33:57 
And we're currently in data validation. 

 
Contezini, Leonardo   1:34:01 
Exactly. 

 
Dickson, Dustin   1:34:07 
What am I missing, Khrystyna? Anything so? 
I think we've got a... 

 
Zhyrovetska, Khrystyna   1:34:17 
And I think that's right, yeah. 

 
Dickson, Dustin   1:34:20 
This is our biggest issue right here on. 
the dependency of NATA, correct? So if we were to, and that's why I look back here, like if we only have Vitor and we want Vitor to help us with... 
Uh. 
We have to have a click developer, either Vitor or someone else. We have to have a click developer to solve this problem right here. And then... 
If we, to me, the two that are that are pressing or that have to be supported are these two, right? Khrystyna, the other one, two, three, 4 are not in production. 
as an active click sense application that the business is relying on. 

 
Zhyrovetska, Khrystyna   1:35:07 
That's right. 

 
Dickson, Dustin   1:35:10 
That makes sense, Leo. 

 
Contezini, Leonardo   1:35:13 
Yes, it does. 

 
Dickson, Dustin   1:35:15 
The rest. 

 
Contezini, Leonardo   1:35:15 
Ohh. 

 
Dickson, Dustin   1:35:21 
This is what we're trying to cover with... 
Da. 
Bob in. 
Yes. 

 
Zhyrovetska, Khrystyna   1:35:39 
Okay. 

 
Dickson, Dustin   1:35:40 
Clinic. 
Now, I know. 
AU. 
I know, Leo, you mentioned that we could we could do something instead of right back to manage master data, but currently those two are being used. 

 
Contezini, Leonardo   1:36:03 
Uh-huh. 
Yeah. 

 
Dickson, Dustin   1:36:05 
So I think we immediately have to say... 
That. 
Right? Would you agree, Khrystyna, that... 
We're not gonna, if NATA is not going to remain on, we would not start any more projects with NATA such as these. 

 
Zhyrovetska, Khrystyna   1:36:33 
Yes, I think Nata needs to finish everything that we have right now on the dynamics side. If there would be any other requirements on master data, then... 
this one as well, but there is no really time to start on the other apps that are on hold. 

 
Dickson, Dustin   1:36:55 
No. 
Leo, in my opinion. 
We've got to find a click developer to take this part. That click developer. 
It would be ideal if that click developer also had capability to do this as well. So if that is Vitor, we need to move Vitor here, right? And then go find this guy, BIAI. 

 
Contezini, Leonardo   1:37:23 
Yeah, yeah, I'm already checking with my team. 

 
Dickson, Dustin   1:37:27 
Okay, because... 
If Vitor has click experience, then that maybe Vitor needs to go here. 
This guy needs to be new. I don't know, I'll leave it up to you guys, but... 

 
Contezini, Leonardo   1:37:36 
Huh? 

 
Dickson, Dustin   1:37:42 
Put Vitor here, and then... 
You got here. 
That one would be blank, so... 
Something like that. 

 
Contezini, Leonardo   1:38:12 
This makes sense. 

 
Dickson, Dustin   1:38:17 
We want somebody really strong to help us with Ploog. 
And then, Christina, I think we take the requirements that we've put together that we envision that would go to Qlik Sense one day, and we start thinking about how to put those requirements 
In one application that covers all of this scope, with the exception of... 
The Dynamics piece, which I think ultimately we will try to do something different than the iframes inside Dynamics. 
and click. But I think we've got to stay with that approach until we get there is my point. We cannot, because we've got CRM depending on us. 

 
Zhyrovetska, Khrystyna   1:38:57 
Mhm. 
Mhm. 
Okay. 

 
Dickson, Dustin   1:39:18 
All right, what questions do we have? Anything else? 

 
Zhyrovetska, Khrystyna   1:39:29 
No, I think we covered it. 

 
Contezini, Leonardo   1:39:29 
I don't know. 
I agree. I believe that as soon as Vitor comes back, he needs to be in touch with Nata to take over the master data and dynamics, right? 

 
Dickson, Dustin   1:39:46 
I think we need to focus on knowledge transfer there first. So, Khrystyna, is there a way that we can... 
do knowledge transfer with you and not tie up not to, because what I don't want to happen, Leo, is that we have not to work in half on knowledge transfer and half on, she's got a lot of requirements here she's got to keep up with. 

 
Contezini, Leonardo   1:40:10 
Mhm. 

 
Dickson, Dustin   1:40:13 
Khrystyna, could you provide us a list of the current requirements we have with the offering? 

 
Zhyrovetska, Khrystyna   1:40:13 
So. 
Yes, and I can start the first meetings and explain like all of the business logic and then we can have not to join the knowledge transfer later. It's some. 
Um... 

 
Dickson, Dustin   1:40:37 
I mean, you guys, whatever you think, Khrystyna, I just don't want to tie. I don't want, I don't want to slow knot it down if in the middle of the CRM project. Leo, my concern is making sure we deliver the CRM project on time. 

 
Zhyrovetska, Khrystyna   1:40:37 
Further meetings? 
Dustin. 

 
Contezini, Leonardo   1:40:52 
Mhm. 
Yes, and when is the due date for that? 

 
Zhyrovetska, Khrystyna   1:40:55 
Yep. 

 
Dickson, Dustin   1:41:01 
Da. 
The requirements are ongoing. So we developed some base level reporting in the dynamic system via, and we're displaying it via an iFrame, but now they're asking for more and more reporting. So it's never going to end. And I think we've just got to make a decision on 

 
Contezini, Leonardo   1:41:19 
Uh-huh. 

 
Zhyrovetska, Khrystyna   1:41:19 
Yeah. 

 
Dickson, Dustin   1:41:22 
Where is not to at, what requirements do we have in the pipeline, and when do we switch over? And that's why I'm asking, what is the pipeline right now, Christina, for Dynamics? 

 
Zhyrovetska, Khrystyna   1:41:33 
Mhm. 
So, yeah, I can send you the current list of tasks that Nata is either working on now or it's like in the pipeline, and I can start the knowledge transfer for Vitor and. 
Leo. 
on these two projects and then we could involve Nata later after she finishes the most critical process. 

 
Contezini, Leonardo   1:42:07 
Okay. 

 
Dickson, Dustin   1:42:07 
What do you think? What? 

 
Zhyrovetska, Khrystyna   1:42:07 
Because the application. 

 
Dickson, Dustin   1:42:10 
What do you think if we had to give a date today, Khrystyna, on transition and not off? How much notice do we do should we give her in your mind? 

 
Zhyrovetska, Khrystyna   1:42:23 
So currently we have our SOW signed until the end of June. So I would think at least this, like at least this one month. 

 
Dickson, Dustin   1:42:33 
K. 

 
Zhyrovetska, Khrystyna   1:42:34 
And yeah, then depends on you. You probably know a bit better, like how much new requirements you have coming in. 
So. 

 
Dickson, Dustin   1:42:45 
I think I think the goal should be that is that that's 3 1/2 weeks if we wanna extend that to the 3rd, which is that Friday. 
That would give us 4 full weeks plus this week with not to. 

 
Zhyrovetska, Khrystyna   1:43:01 
Mhm. 

 
Dickson, Dustin   1:43:01 
But, but maybe you guys do a little bit of knowledge transfer, Leo, and you give me a recommendation on you if you think that's realistic. 

 
Contezini, Leonardo   1:43:10 
Okay, yeah. 

 
Dickson, Dustin   1:43:12 
That would be Lili would be back the 22nd. That would give not Lili one week with not to still here. 
We could eat, or sorry, that would give that would give Lili 2 full weeks with not to steal here, which would be good to know, good to have. 

 
Contezini, Leonardo   1:43:29 
Uh-huh. 

 
Dickson, Dustin   1:43:29 
But I, but to that point, I need to tell Jacob, you know. 
He's the one take, Jacob's the one taking the requirements from the business. So we need to throttle, we need to give them realistic expectations. 
of what's, you know, because they're going to be continuing to ask for requirements. And if we're transitioning developers, we need to just be realistic with them. 
But if that person, if that person is Vitor, then maybe we can transition a lot of this even prior to her leaving. 

 
Zhyrovetska, Khrystyna   1:43:58 
Yeah, right. 

 
Contezini, Leonardo   1:44:08 
Uh-huh. 
I think that by the time Vitor is already here and we do not have much time, we can use him for this demand. 

 
Dickson, Dustin   1:44:20 
Okay. 
All right, anything else we need to cover today, Khrystyna? 

 
Zhyrovetska, Khrystyna   1:44:28 
Uh, no, just one question to Leo: when is Vitor back so that I would know and schedule like our first sessions? 

 
Contezini, Leonardo   1:44:36 
Okay, uh, he's back, he's back on next Monday. 

 
Zhyrovetska, Khrystyna   1:44:37 
Oh, it must have been later. 

 
Contezini, Leonardo   1:44:41 
And I really think that the documentation you wrote for the store level data is very useful, so we could repeat that pattern. And then when he's back, we can talk about... 

 
Zhyrovetska, Khrystyna   1:44:42 
Okay. 

 
Contezini, Leonardo   1:44:58 
The tasks that still need still needs to be to be done, so this way we can do a like a reverse engineering, you know, to understand where does the data come from and so on. 

 
Zhyrovetska, Khrystyna   1:45:12 
Hello! 
Okay, sounds good. That's great. It will give me a few days also to update the documentation by the next Monday. So I'll set up some sessions for us next week. 

 
Contezini, Leonardo   1:45:26 
Okay. 

 
Dickson, Dustin   1:45:27 
Christina, do you think it is worth trying to keep not to through the whole week there or is it going to be a headache trying to get that scope of work changed? 

 
Zhyrovetska, Khrystyna   1:45:40 
Um... 
Like from our side, it won't be hard, so it's just on your side, I think you would need to sign some addendum to... 

 
Dickson, Dustin   1:45:52 
Okay. 

 
Zhyrovetska, Khrystyna   1:45:55 
current SOW. And also, sorry, just one last point is that we are off on 29th. So it would make sense probably to prolong until the end of the week, because it will be just. 

 
Dickson, Dustin   1:45:55 
That's. 
Da. 

 
Zhyrovetska, Khrystyna   1:46:09 
30 Stern. 

 
Dickson, Dustin   1:46:09 
Four day a week. 
Okay. 
Right. 

 
Zhyrovetska, Khrystyna   1:46:30 
And I'll check with my team on like how we should make this transition to like July 3rd. How could we extend it? 

 
Dickson, Dustin   1:46:30 
Okay. 
OK. 
I'll send a copy of this to you in... 
Leo, Leo, don't share the file with the date on there for not until we communicate to her, if you don't mind. 

 
Zhyrovetska, Khrystyna   1:46:50 
Mmh. 

 
Contezini, Leonardo   1:46:57 
Uh-huh. 

 
Dickson, Dustin   1:46:58 
We probably won't do that. Maybe, Christina, you could, let's just see how you guys feel free to wait to tell Nada, you tell Nada when you're ready, Christina, or if you want us to do that, we can do that. But let's see what we, 

 
Contezini, Leonardo   1:46:58 
Okay. 

 
Dickson, Dustin   1:47:16 
Let's do some thinking and see what we find here and get that pipeline before we communicate that in case anything changes. Okay. 

 
Zhyrovetska, Khrystyna   1:47:25 
Okay, yeah, we usually handle this internally and has to notify Nata one month in advance. So I would ask you like to, you know, we can take by the end of this week, but next week we would need to notify Nata. 

 
Dickson, Dustin   1:47:28 
Okay. 
All right, let's try to make the decision by the end of the week and that way you guys can notify her. So we can, that way, I guess that will be our action item this week is to make sure that we're comfortable with that deadline. 

 
Zhyrovetska, Khrystyna   1:47:57 
Mhm, alright. 

 
Dickson, Dustin   1:47:59 
All right. 
And I'll communicate that to Lili just to make sure she has no other input there, but I think we've got to do it. 

 
Contezini, Leonardo   1:48:02 
Mhm. 

 
Zhyrovetska, Khrystyna   1:48:02 
Yu. 
Okay, sounds good. Thank you, Dustin, for clarity. 

 
Dickson, Dustin   1:48:15 
Thanks. 
All right, thank you, guys. 

 
Contezini, Leonardo   1:48:21 
Thank you very much, guys. 

 
Dickson, Dustin   1:48:23 
Vikram. 

 
Zhyrovetska, Khrystyna   1:48:23 
Thanks. Have a nice day. Bye. 

 
Contezini, Leonardo   1:48:25 
Bye bye. 

 
Contezini, Leonardo stopped transcription 
