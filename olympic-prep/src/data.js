export const DAYS = [
  // PRE-WEEK: INTEL GATHERING
  {
    date: 'Fri Jun 26',
    label: 'Research',
    tasks: [
      '[Research] Re-read Kathleen\'s LinkedIn. Review her Seattle Children\'s $150M Epic implementation. Understand her legacy in this territory.',
      '[Know It] Review Kathleen questions tab. Rank your top 7 must-ask questions.',
      '[Mental] Watch Amy Cuddy TED Talk tonight. Journal: Write 3 reasons you are the right person for this role.',
    ],
    milestone: null,
  },
  {
    date: 'Sat Jun 27',
    label: 'Know It',
    tasks: [
      '[Know It] Read full interview prep document for the first time. Get the big picture.',
      '[Research] Review Novartis HIT flashcard and resources page one more time before Kathleen\'s call.',
      '[Mental] Lagree or pickleball. Early night.',
    ],
    milestone: null,
  },
  {
    date: 'Sun Jun 28',
    label: 'Key Meeting',
    tasks: [
      '[Key Meeting] Before: 10-minute visualization. Warm, genuine, grateful. Conversation between allies.',
      '[Key Meeting] During: Top 7 questions. Detailed notes. Listen for what she volunteers unprompted.',
      '[Intel] After: Write up notes immediately. Thank you text within 1 hour. Update Elvianne questions tonight.',
    ],
    milestone: {
      type: 'alert',
      text: 'After Kathleen\'s call update your Elvianne questions, interview answers, and cover letter with new intelligence before Monday.',
    },
  },
  {
    date: 'Mon Jun 29',
    label: 'Key Meeting',
    tasks: [
      '[Key Meeting] Before: Review updated Elvianne questions incorporating Kathleen intel. 10-minute visualization.',
      '[Key Meeting] During: Deep on process, CRM tools, interview format, Steven\'s style. Listen for what she volunteers.',
      '[Intel] After: Write up notes immediately. Thank you email within 2 hours. Update answers and cover letter tonight.',
    ],
    milestone: {
      type: 'milestone',
      text: 'Both insider calls complete. Cover letter and answers updated with intel no other candidate has.',
    },
  },
  // WEEK 1: BUILD THE FOUNDATION
  {
    date: 'Tue Jun 30',
    label: 'Intel',
    tasks: [
      '[Intel] Integrate Kathleen and Elvianne intel into all Q&As. Finalize cover letter.',
      '[Know It] Memorize 60-second opener. Practice arc: nurse → GE → Overlake → why Novartis → Kathleen.',
      '[Practice] Record Q1–Q5. Watch back. Fix pacing, content, body language.',
    ],
    milestone: null,
  },
  {
    date: 'Wed Jul 1',
    label: 'Know It',
    tasks: [
      '[Know It] Study Q6–Q10. Write STAR format for each. GE and Overlake stories cold. No answer over 2 minutes.',
      '[Research] Territory Part 1: MultiCare and Fred Hutch. EHR platform, size, recent news, HIT initiatives.',
      '[Practice] Trusted person runs Q6–Q10 cold. Time each answer.',
    ],
    milestone: null,
  },
  {
    date: 'Thu Jul 2',
    label: 'Know It',
    tasks: [
      '[Know It] Study Q11–Q14. Use ePMO founding story and FY Transition program.',
      '[Research] Territory Part 2: Providence, PeaceHealth, OHSU, Salem Health, Legacy Health, Virginia Mason.',
      '[Mental] Watch Simon Sinek Start With Why. Think about your WHY for this role.',
    ],
    milestone: null,
  },
  {
    date: 'Fri Jul 3',
    label: 'Know It',
    tasks: [
      '[Know It] Study Q15–Q23. Practice failure story and influence without authority story out loud.',
      '[Know It] EHR tools: SlicerDicer, Reporting Workbench, BPAs, SmartForms, Dynamic Work Lists.',
      '[Mental] Visualization: Panel interview. Calm, specific, compelling. They are impressed.',
    ],
    milestone: null,
  },
  {
    date: 'Sat Jul 4',
    label: 'Rest',
    tasks: [
      '[Rest] No heavy prep. Physical activity only. Walk, Lagree, pickleball. Your brain needs recovery time.',
    ],
    milestone: {
      type: 'milestone',
      text: 'Holiday rest. Brain consolidating everything you have learned.',
    },
  },
  {
    date: 'Sun Jul 5',
    label: 'Know It',
    tasks: [
      '[Know It] Study Novartis products: Leqvio, Fabhalta, Kisqali, Scemblix, Pluvicto, Cosentyx, Kesimpta.',
      '[Know It] Compliance cold: Novartis educates and advises. We do not program, code, or operate any customer EHR and we do not access PHI.',
      '[Apply] Prep all application materials: resume, cover letter, referral link ready for Monday morning.',
    ],
    milestone: null,
  },
  {
    date: 'Mon Jul 6',
    label: 'Apply',
    tasks: [
      '[Apply] Submit the moment posting opens. Use Elvianne\'s referral link. Upload JValderrama_Resume_61626.docx and cover letter. Confirm with Elvianne and Kathleen.',
      '[Know It] Review all 23 Q&As. Flag 5 weakest for Round 1 focus.',
      '[Mental] Celebrate tonight. You have earned it.',
    ],
    milestone: {
      type: 'milestone',
      text: 'Application submitted. All 23 questions studied. EHR tools, therapeutic areas, and compliance known.',
    },
  },
  // WEEK 2: SHARPEN, PRACTICE AND PERFORM
  {
    date: 'Tue Jul 7',
    label: 'Practice',
    tasks: [
      '[Practice] Trusted colleague. Q1–Q11. No notes. Content accuracy and story specificity. Debrief immediately.',
      '[Research] Community oncology practices in WA and OR using iKnowMed, OncoEMR, Meditech.',
      '[Mental] Watch Brené Brown on vulnerability. Authentic storytelling beats polished performance.',
    ],
    milestone: null,
  },
  {
    date: 'Wed Jul 8',
    label: 'Know It',
    tasks: [
      '[Know It] Internalize 90-day plan. Three phases: listen and assess, identify and prioritize, propose and execute.',
      '[Research] Novartis 2026 news and pipeline. Commercial strategy and how HIT advisory supports it.',
      '[Mental] Lagree or pickleball. Non-negotiable this week.',
    ],
    milestone: null,
  },
  {
    date: 'Thu Jul 9',
    label: 'Practice',
    tasks: [
      '[Practice] Different person. Q12–Q22. Score each answer 1–10 on confidence, clarity, specificity.',
      '[Know It] Review 3 questions for Steven. Positioning statement. 60-second opener. Cover letter.',
      '[Mental] Visualization: You are in the room with Steven and the panel. You are the most prepared person there.',
    ],
    milestone: null,
  },
  {
    date: 'Fri Jul 10',
    label: 'Practice',
    tasks: [
      '[Practice] Review Round 2 feedback. Practice 3 weakest answers only. Do not re-practice what is already strong.',
      '[Know It] Final territory research. Lock in Pacific Northwest landscape knowledge.',
      '[Mental] Write letter to yourself about why you deserve this role. Read it out loud. Keep it for interview morning.',
    ],
    milestone: null,
  },
  {
    date: 'Sat Jul 11',
    label: 'Practice',
    tasks: [
      '[Mental] Morning: Dress in your interview outfit. Get into interview day state of mind.',
      '[Practice] Mock Interview Round 3: Full video call. All 23 questions. Timed. Recorded. No stopping. No do-overs.',
      '[Practice] Evening: Review recording. Where do you trail off, over-explain, or shine brightest. Top 3 areas to tighten.',
    ],
    milestone: {
      type: 'milestone',
      text: 'Full Dress Rehearsal — Olympic Qualifying Round. Treat this exactly like the real thing.',
    },
  },
  {
    date: 'Sun Jul 12',
    label: 'Practice',
    tasks: [
      '[Practice] 3 weakest answers only. Short and sharp. Fix the last gaps.',
      '[Know It] Light review: opener, 3 questions for Steven, positioning statement. Nothing new.',
      '[Mental] Read your letter. Feel it. Believe it. You are ready.',
    ],
    milestone: null,
  },
  {
    date: 'Mon Jul 13',
    label: 'Key Meeting',
    tasks: [
      '[Mental] Morning: Read your letter. 10-minute visualization of perfect interview. Opener review only. No cramming.',
      '[Rest] Afternoon: Something that energizes you. Family, walk, pickleball. Trust your preparation.',
      '[Mental] Evening: Early night. Outfit ready. Notes folder prepped. Alarm set.',
    ],
    milestone: {
      type: 'milestone',
      text: '4 mock interviews complete. Fully prepared. You are the most prepared candidate in this process.',
    },
  },
]

export const LABEL_COLORS = {
  'Key Meeting': 'bg-purple-600 text-white',
  'Know It': 'bg-indigo-600 text-white',
  'Practice': 'bg-green-600 text-white',
  'Mental': 'bg-rose-600 text-white',
  'Research': 'bg-red-600 text-white',
  'Apply': 'bg-amber-600 text-white',
  'Intel': 'bg-teal-600 text-white',
  'Rest': 'bg-gray-500 text-white',
}

export const QA_CATEGORIES = [
  {
    name: 'Category 1: About You',
    questions: [
      {
        q: 'Tell me about yourself.',
        a: `So my background is a little different from most people you might talk to for this role. I started as a registered nurse which honestly shaped everything about how I think about health IT. I understand what it is like to be at the bedside and how technology either helps or gets in the way of care. That clinical lens is something I bring into every engagement.

From there I moved into health IT at GE Healthcare where I spent about a decade as the primary adviser to health systems across the country, implementing EHR systems and being that go-to person for clinical and operational leaders.

What I do now at Overlake is where it all comes together. I lead a portfolio of AI and digital programs at the enterprise level, working directly with C-suite sponsors and clinical leaders. I designed and led our ambient AI documentation program across 200+ providers, and our conversational AI deployment cut patient call volume by over 85% in the first 90 days.

What excites me about this role is taking that advisory work into the field. And the fact that Kathleen, who built something remarkable in this role, chose to refer me means everything.`,
        tip: 'Practice this until it sounds natural, not rehearsed. Arc: nurse → GE → Overlake → why Novartis → Kathleen.',
      },
      {
        q: 'Why are you interested in this role?',
        a: `A few things came together for me. First, Kathleen's referral. She knows this role from the inside and she knows my background. When someone of her caliber says you are the right fit, you pay attention.

Second, what Steven described on our call resonated deeply. The opportunity to be that trusted field adviser, to walk into a health system, understand where they are, and help them define a roadmap — that is the work I love most. I have been doing a version of it internally at Overlake for years but I am ready to take it into the field.

Third, the Pacific Northwest is my home. I know these health systems. I have relationships here. And I genuinely believe this territory has enormous untapped potential for the kind of HIT advisory work Novartis offers.`,
        tip: null,
      },
      {
        q: 'Why are you leaving Overlake?',
        a: `Overlake has been a fantastic place to build and I am proud of what I have accomplished there. But I have reached a natural inflection point. The programs I built are running well, the PMO is established, and I am looking for a role that lets me take what I have learned and apply it at scale across multiple health systems rather than one.

This role is that next step. It is not about leaving something. It is about stepping into something that matches where I am in my career and what I want to contribute.`,
        tip: 'Never speak negatively about Overlake. This is a growth story, not a departure story.',
      },
      {
        q: 'What does your current role look like day to day?',
        a: `No two days look the same which is honestly what I love about it. On any given day I might be presenting a quarterly performance review to our CMO, facilitating a clinical workgroup on a new AI program, reviewing metrics on our ambient documentation adoption, or working through a process challenge with a vendor.

I oversee about ten concurrent programs right now spanning AI governance, EHR optimization, revenue integrity, and financial transformation. I am the person who connects the dots across all of them, keeps executive sponsors informed, and makes sure every program has a clear path from current state to sustained adoption.`,
        tip: null,
      },
      {
        q: 'Walk me through your clinical background and how it applies here.',
        a: `I trained and practiced as a registered nurse in Canada, working in pediatric cardiology, home care, and acute medicine. High acuity environments where you have to think fast, assess quickly, and communicate clearly with patients, families, and physicians simultaneously.

What that experience gave me that I cannot get from any certification or degree is a visceral understanding of what it is like to be a clinician. I know what cognitive burden feels like. I know what happens when technology gets in the way of care instead of enabling it. And I know what it takes to earn a clinician's trust.

When I walk into a health system as a HIT adviser, I am not just someone who knows the technology. I am someone clinicians recognize as one of their own. That changes the conversation entirely.`,
        tip: 'This is your single biggest differentiator. Deliver it with conviction.',
      },
    ],
  },
  {
    name: 'Category 2: HIT Advisory and Client Engagement',
    questions: [
      {
        q: 'How do you approach a new health system relationship?',
        a: `My first step is always to listen and assess before I recommend anything. I want to understand their strategic priorities, their EHR environment, how their clinical workflows are structured, and where the gaps are between what their data shows and what clinical care pathways recommend.

From there I help them understand what tools already exist in their EHR — whether that is Epic SlicerDicer, Reporting Workbench, Best Practice Advisories, or Cerner Dynamic Work Lists — that can surface patients who might benefit from earlier identification and intervention.

The key constraint I operate within is that I am there to educate and advise, not to build or operate their systems. I help them understand what is possible and then support their own teams in making it happen. That distinction is important both from a compliance standpoint and from a relationship standpoint. Health systems trust advisers who respect that boundary.`,
        tip: null,
      },
      {
        q: 'How do you identify what a health system needs when they may not know themselves?',
        a: `This is one of my favorite challenges and honestly where my nursing background is most useful. In clinical care you learn to look beyond what a patient tells you and assess what is actually happening. I bring that same diagnostic instinct to health system engagements.

I look for patterns across multiple conversations. I pay attention to what people say and what they do not say. I look at their data, their workflows, and their outcomes. And I ask questions that help leaders articulate problems they have been living with so long they stopped seeing them.

At Overlake I used this approach to identify $500K+ in projected revenue recovery that nobody had connected to a technology solution yet. The problem existed, the data existed, but nobody had mapped them together. That is the kind of gap I look for.`,
        tip: null,
      },
      {
        q: 'Tell me about a time you had to educate a clinical or executive leader on a technology solution.',
        a: `When I proposed our ambient AI documentation program at Overlake, our CMO was skeptical. Physicians had heard a lot of promises about technology reducing their burden and most of those promises had not delivered.

I did not lead with the technology. I led with the problem. I showed her the data on after-hours chart time and documentation burden across our provider population. Then I walked her through how the solution worked in plain language, what the evidence showed from other health systems, and what our phased rollout would look like so we could validate before scaling.

She approved the program and became one of our strongest advocates. That is the same approach I would take in the field — lead with the clinical problem, support with data, and make the solution tangible.`,
        tip: null,
      },
      {
        q: 'How do you handle a client who is resistant to change?',
        a: `Resistance is almost always rooted in something real. Either a previous technology failed them, they do not see what is in it for them, or they do not trust that the implementation will be done well. My job is to figure out which one it is and address it directly.

I never try to push through resistance. I slow down and listen. I ask what their concerns are and I take them seriously. Sometimes the resistance reveals a legitimate gap in the solution that needs to be addressed before moving forward.

At Overlake I had a department director who was strongly opposed to our conversational AI deployment because she was worried it would increase her team's workload during the transition. Instead of overriding her concern I brought her into the design process. She became a co-owner of the solution and one of its biggest champions post go-live.`,
        tip: null,
      },
      {
        q: 'Describe a situation where you translated complex technical capabilities into practical solutions.',
        a: `When we were evaluating DAX Copilot for our ambient AI program, I had to present the business case to a steering committee that included our CFO, CMO, and Chief of Staff. None of them wanted a technical deep dive. They wanted to know what problem it solved, what it would cost, what the risk was, and what success would look like.

I built a presentation that started with the clinical problem — documentation burden and after-hours chart time — then showed the solution in plain language, then walked through a metrics-gated rollout plan with clear go and no-go criteria at each phase.

That is exactly what the Novartis HIT role calls for. Taking complex EHR capabilities and presenting them in a way that health system leaders can understand and act on.`,
        tip: null,
      },
    ],
  },
  {
    name: 'Category 3: Process and Operations',
    questions: [
      {
        q: 'Tell me about a time you had to define a process from scratch.',
        a: `When I joined Overlake there was no formal PMO. Projects were being managed inconsistently, there was no standard intake process, and leadership had limited visibility into what was in flight.

I co-founded the enterprise PMO from the ground up. I built the intake governance process, the project documentation templates, the Smartsheet tracking infrastructure, and the executive dashboard reporting. Within the first year we had standardized governance across 30+ strategic initiatives and leadership had real-time visibility into portfolio performance for the first time.

Steven mentioned on our call that part of this role involves defining existing processes. That is exactly the kind of work I have done before and I genuinely enjoy it. Building structure where there is ambiguity is one of my strengths.`,
        tip: null,
      },
      {
        q: 'How do you handle ambiguity?',
        a: `I am comfortable with ambiguity because I have spent most of my career in it. When I joined Overlake the AI governance space was completely undefined. No policies, no frameworks, no precedent. When I started the PMO there was no blueprint. When I led our first ambient AI program there was no established playbook for health systems our size.

My approach is to move forward with the information I have, build iteratively, and course correct as I learn more. I do not wait for perfect clarity before taking action. I define what I know, flag what I do not know, and make a plan to close the gaps.

Steven specifically said he needs someone who is comfortable with ambiguity and can think outside the box. That is genuinely how I operate.`,
        tip: null,
      },
      {
        q: 'Describe how you have used data and metrics to drive decisions.',
        a: `Data is the backbone of everything I do. I do not launch a program without defining what success looks like upfront and I do not scale without validating the metrics first.

For our ambient AI program I used Epic data including time in notes and after-hours chart time to identify the highest burden providers and prioritize them for the first cohort. I then set utilization rate thresholds that each cohort had to hit before we expanded to the next group. That metrics-gated approach is what got us to 70% adoption across 200+ providers.

I also deliver quarterly performance reviews to our C-suite that translate program metrics into business outcomes. Not adoption percentages in isolation but what those numbers mean for clinician experience, operational efficiency, and patient care.`,
        tip: null,
      },
      {
        q: 'Tell me about a time you worked across multiple stakeholders simultaneously.',
        a: `My current role is essentially this every day. Right now I am simultaneously managing our AI governance committee, two Epic Community Connect partner sites, a fiscal year transition program with Finance, HR, IT, and Operations, and an Axiom conversion project.

Each of those workstreams has different stakeholders with different priorities and different communication styles. My job is to keep all of them moving forward without letting any one of them create a bottleneck for the others.

The key is being very clear about roles, decisions, and timelines upfront and communicating proactively when something changes. I would rather over-communicate than have a stakeholder surprised.`,
        tip: null,
      },
    ],
  },
  {
    name: 'Category 4: AI and EHR Specific',
    questions: [
      {
        q: 'What is your experience with ambient AI?',
        a: `This is where I am probably most current among candidates you will speak with. I designed and led Overlake's enterprise ambient AI documentation program from the ground up. I evaluated vendors, built the business case, designed the phased rollout model, set the metrics gates, and have been managing adoption and outcomes ever since.

We achieved an estimated 70% adoption across 200+ providers with reported reductions in documentation time and cognitive burden. I also translated clinician feedback into formal vendor recommendations that influenced DAX Copilot's product roadmap.

Right now I am in the middle of evaluating Ambience Healthcare as a potential replacement for DAX — 183 licenses, comparing approximately $44K per month for DAX versus a lower per-provider rate for Ambience. I know both products from the health system decision-maker side. That perspective is something I can bring directly into conversations with your accounts.`,
        tip: 'This is your strongest differentiator in Category 4. Own it.',
      },
      {
        q: 'How familiar are you with EHRs beyond Epic?',
        a: `Very familiar. My deepest non-Epic experience is at GE Healthcare where I spent nearly a decade implementing GE Centricity Orders and Results modules at major health systems across the country. I set up and tested HL7 integrations across radiology, pharmacy, and lab systems at health systems including Memorial Florida, Hoag, UCLA, and others.

I also have familiarity with Cerner through my work at UW Medicine where the health system used both Epic and Cerner across different entities.

I have also reviewed the Novartis HIT resources and I see you have guides built for Oracle Cerner, iKnowMed, OncoEMR, Meditech, and EMA/ModMed in addition to Epic. I am familiar with the core reporting and workflow concepts that translate across platforms — SlicerDicer and Reporting Workbench in Epic have equivalents in Dynamic Work Lists and Discern Analytics in Cerner. The platform changes but the clinical logic stays consistent.`,
        tip: null,
      },
      {
        q: 'How do you stay current with health IT trends?',
        a: `A few ways. I sit on the HIMSS Washington Chapter board as Program Chair which means I am constantly reviewing proposals, hosting events, and staying connected to what health system leaders are thinking about. I attended the UW RAIN Summit on AI in healthcare and a CHIME executive AI governance roundtable recently.

I am also completing my PMI Certified Professional in Managing AI credential right now which is keeping me very current on AI governance frameworks and responsible adoption practices.

And honestly my day to day work keeps me current. When you are actively evaluating ambient AI vendors, deploying conversational AI, and sitting on an enterprise AI governance committee, you do not have the luxury of being behind the curve.`,
        tip: null,
      },
      {
        q: 'What do you see as the biggest opportunities for AI and HIT in health systems right now?',
        a: `Three areas stand out to me, and they map directly to what the Novartis HIT team is already doing.

First, patient identification and risk stratification. Most health systems have incredible amounts of clinical data in their EHRs but limited capacity to turn it into actionable intelligence. Using tools like SlicerDicer, Reporting Workbench, and Best Practice Advisories to surface patients with cardiovascular disease, kidney disease, or oncology conditions who are not yet on guideline-directed therapy is one of the highest-value things a HIT adviser can do right now.

Second, embedding care pathways into the workflow. Clinical decision support that fires at the right moment makes the right action the easy action.

Third, patient activation. Technology that helps patients engage in their own care is the next frontier and something I have direct experience with through our conversational AI and digital access work at Overlake.`,
        tip: null,
      },
      {
        q: 'Are you familiar with our HIT resources and how you would use them in the field?',
        a: `Yes, I spent time on the Novartis HIT resources page and I was really impressed by the depth and breadth of what the team has built. You have patient identification guides and workflow optimization resources across Epic, Cerner, iKnowMed, OncoEMR, Meditech, and ModMed covering cardiovascular, renal, oncology, and immunology.

What struck me is how practical and immediately actionable these resources are. A health system can download a tip sheet and use SlicerDicer that same day to start identifying patients with IgAN or C3G. That is exactly the kind of education and value-added advisory service that health systems appreciate.

I also noticed that Neuroscience resources are listed as coming soon, which tells me there is active growth in the team's scope. That is exciting to me.`,
        tip: 'Most candidates will not have studied the HIT resources page. This answer immediately sets you apart.',
      },
    ],
  },
  {
    name: 'Category 5: Behavioral and Situational',
    questions: [
      {
        q: 'Tell me about a time you failed and what you learned.',
        a: `Early in my time at Overlake I launched a program rollout without adequate change management planning. I had the technology right, the metrics right, and the timeline right but I underestimated how much clinical leader buy-in I needed before we went live. We hit significant resistance at go-live that could have been avoided.

What I learned is that no matter how strong the solution is, adoption is a people problem first and a technology problem second. Every program I lead now starts with a structured change management plan before we touch the technology. That shift is directly reflected in the 70% adoption we achieved on our ambient AI program.`,
        tip: 'Be genuine. Show growth. End with the outcome that proves you learned.',
      },
      {
        q: 'Describe a situation where you had to influence without authority.',
        a: `This comes up constantly in my work because I lead programs that cut across departments and functions I do not own.

The clearest example is our MyChart message billing go-live. To make that happen I had to align Finance, Legal, Compliance, Risk, IT, clinical operations, and physician leadership — none of whom report to me. Each group had different concerns and different timelines.

I built a coordinated workgroup, created a shared timeline with dependencies, and met with each stakeholder individually to understand their concerns before our first group meeting. By the time we got to the room together the major objections had already been addressed one on one. We went live on schedule.`,
        tip: null,
      },
      {
        q: 'Tell me about a time you built a relationship with a difficult stakeholder.',
        a: `When I was leading our conversational AI deployment at Overlake, our Chief Nursing Officer was initially very resistant. She had concerns about patient experience and whether an AI tool could handle the nuance of patient inquiries appropriately.

Rather than presenting to her I asked if I could spend time with her team first to understand their patient communication workflows. I spent two days shadowing the call center and came back with a set of specific use cases where the AI would help and a short list of scenarios where human judgment was essential.

That changed the conversation completely. She felt heard, she saw that I had done the homework, and she became a genuine partner in the deployment. The relationship was built on respect and curiosity, not on selling.`,
        tip: null,
      },
      {
        q: 'What does success look like to you in the first 90 days?',
        a: `For me the first 30 days are about listening and learning. I want to understand the accounts in my territory, the existing relationships, what has worked, what has not, and what health system leaders are thinking about. I do not come in with a predetermined agenda.

Days 31 to 60 I want to have identified two or three priority opportunities where I can add immediate value — whether that is helping a health system run their first SlicerDicer query to identify ASCVD patients, walking them through a BPA design for PNH, or connecting them with a Novartis HIT resource they did not know was available.

By day 90 I want to have made a meaningful impression on at least one key account, have a clear territory map with prioritized opportunities, and have contributed something back to the national HIT team based on what I am hearing in the Pacific Northwest.

Ultimately success in 90 days looks like Steven feeling confident he made the right hire.`,
        tip: 'End with that last line. It is memorable and it puts Steven at the center of the answer.',
      },
    ],
  },
]

export const QA_STEVEN_QUESTIONS = [
  'What does success look like in the first 90 days for the person in this role?',
  'How does the HIT team partner with the field sales organization day to day?',
  'What are the biggest opportunities you see in the Pacific Northwest territory right now?',
]

export const KATHLEEN_QUESTIONS = [
  {
    category: 'Strategic — Must Ask',
    starred: true,
    questions: [
      {
        q: 'What do you think Steven is really looking for that might not come through in the JD?',
        why: 'Kathleen knows Steven\'s real priorities. This is the single most valuable question you can ask her.',
        note: 'Ask this first.',
      },
      {
        q: 'What made you successful in this role that you would want me to know going in?',
        why: 'Institutional knowledge no other candidate has. She will tell you exactly what works in this territory.',
        note: 'Must ask.',
      },
      {
        q: 'Are there any accounts in the territory I should know about — relationships to build on or situations I should be aware of?',
        why: 'Account intelligence before the interview lets you speak about the territory with specificity no other candidate has.',
        note: 'Must ask.',
      },
      {
        q: 'Is there anything about my background you think I should emphasize more — or anything I should address proactively?',
        why: 'Direct coaching from your biggest advocate. She may flag a gap or a strength you are underselling.',
        note: 'Must ask.',
      },
    ],
  },
  {
    category: 'Role and Process',
    starred: false,
    questions: [
      {
        q: 'What does the panel interview look like — who will be in the room and what do they each tend to focus on?',
        why: 'Knowing the panelists lets you research them and tailor your answers before you walk in.',
        note: null,
      },
      {
        q: 'How did you approach the first 90 days and what would you do differently knowing what you know now?',
        why: 'Her answer directly informs your 90-day plan and makes your interview answer uniquely credible.',
        note: null,
      },
      {
        q: 'What were the biggest challenges in the Pacific Northwest territory and how did you navigate them?',
        why: 'Real-world context you can reference in the interview to show you understand the territory.',
        note: null,
      },
      {
        q: 'How does Steven like to be communicated with — how often, in what format, and what does he value most?',
        why: 'Lets you mirror his style in the interview and signal you will be easy to manage.',
        note: null,
      },
    ],
  },
  {
    category: 'Relationship and Transition',
    starred: false,
    questions: [
      {
        q: 'Are there key relationships in the territory you would want to make sure get a warm handoff?',
        why: 'Shows you are thinking about continuity and the relationships she built.',
        note: null,
      },
      {
        q: 'What is the one thing you wish someone had told you before you started this role?',
        why: 'Open-ended and powerful. Her answer will be something genuinely useful that no job description captures.',
        note: null,
      },
    ],
  },
]

export const ELVIANNE_QUESTIONS = [
  {
    category: 'Strategic — Must Ask',
    starred: true,
    questions: [
      {
        q: 'What do you think differentiates the strongest AD HIT candidates from the rest when Steven interviews them?',
        why: 'Direct insider intelligence on what wins the interview from someone hired for this exact role.',
        note: 'Must ask.',
      },
      {
        q: 'What types of questions did your interview focus on and what did you wish you had prepared more?',
        why: 'Direct insider intelligence on the interview format and content no other candidate can get.',
        note: 'Must ask.',
      },
      {
        q: 'Who will be on the panel interview with Steven and what do they each tend to focus on?',
        why: 'Lets you research the panelists and tailor your answers to their backgrounds.',
        note: 'Must ask.',
      },
      {
        q: 'Based on what you know about this role and my background, is there anything I should emphasize or address proactively?',
        why: 'She may flag a gap or a strength you are underselling. Save this for the end of the call.',
        note: 'Ask last.',
      },
    ],
  },
  {
    category: 'Day to Day and Operations',
    starred: false,
    questions: [
      {
        q: 'What does a typical week look like for you as an AD HIT?',
        why: 'Grounds your 90-day plan in the reality of what the role actually looks like.',
        note: null,
      },
      {
        q: 'How does the team use the Veeva CRM and what does effective use of it look like in practice?',
        why: 'Elvianne built the CRM solution. Knowing how it works shows you are operationally serious.',
        note: null,
      },
      {
        q: 'Can you walk me through how you approach a new health system account from first contact through active engagement?',
        why: 'Her process is the gold standard for this role. Use it to inform Q6 and your 90-day plan.',
        note: null,
      },
      {
        q: 'How does the HIT team collaborate with field sales day to day and where are the boundaries?',
        why: 'One of your three questions for Steven. Getting Elvianne\'s perspective first makes your answer more informed.',
        note: null,
      },
    ],
  },
  {
    category: 'Territory and Accounts',
    starred: false,
    questions: [
      {
        q: 'Which therapeutic areas are getting the most traction with health systems in the Pacific Northwest right now?',
        why: 'Tells you where to focus your territory research and which Novartis products to study most deeply.',
        note: null,
      },
      {
        q: 'Are there specific accounts in WA and OR that are most active or present the most immediate opportunity?',
        why: 'Account-level intelligence lets you speak about the territory with specificity that impresses Steven.',
        note: null,
      },
      {
        q: 'Are there health systems in the territory using EHR platforms other than Epic I should be particularly prepared for?',
        why: 'Steven said the territory has different EHR platforms. Knowing which ones focuses your prep.',
        note: null,
      },
    ],
  },
  {
    category: 'Team and Culture',
    starred: false,
    questions: [
      {
        q: 'How would you describe Steven\'s leadership style and what does he value most in his team?',
        why: 'Lets you mirror his communication preferences and signal cultural fit in the interview.',
        note: null,
      },
      {
        q: 'How collaborative is the team across regions and how much do AD HITs work together versus independently?',
        why: 'Shows you are thinking about how you will contribute to the team, not just your own territory.',
        note: null,
      },
      {
        q: 'What do you love most about this role and what took you the longest to figure out?',
        why: 'Authentic and relationship-building. Her answer will reveal something real that no job description captures.',
        note: null,
      },
    ],
  },
]

export const RITUALS = {
  morning: [
    'Three deep breaths before you open anything.',
    'Read your three differentiators out loud: clinical credibility, technical depth, strategic experience.',
    'Say out loud: I have done this work. I know this material. I am the right person for this role.',
  ],
  evening: [
    'Write one thing you prepared well today.',
    'Write one thing you will sharpen tomorrow.',
    '10-minute visualization: See yourself walking into the interview confident and calm. Hear your opener land clearly. See Steven nodding. See the panel impressed. See the offer coming.',
  ],
  anxiety: [
    'Say out loud: I have done this work. I know this material. I am the right person for this role.',
    'Take 5 slow breaths.',
    'Read the letter you wrote to yourself about why you deserve this role.',
    'Remember: Kathleen chose you. Steven engaged with you before the posting opened. You are already ahead of every other candidate.',
  ],
  tedTalks: [
    {
      title: 'Amy Cuddy — Your Body Language May Shape Who You Are',
      url: 'https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are',
      note: 'Tonight June 26. Watch this first.',
    },
    {
      title: 'Simon Sinek — How Great Leaders Inspire Action',
      url: 'https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action',
      note: 'July 2. Think about your WHY for this role.',
    },
    {
      title: 'Brené Brown — The Power of Vulnerability',
      url: 'https://www.ted.com/talks/brene_brown_the_power_of_vulnerability',
      note: 'July 7. Authentic storytelling beats polished performance.',
    },
  ],
  podcasts: [
    'Fierce Healthcare Podcast',
    'Health IT Podcast',
    'HIMSS Podcast',
    'High Performance Podcast with Jake Humphrey',
  ],
  physical: [
    'Lagree or pickleball at least 3 times during the prep period.',
    'Full rest on Saturday July 4th holiday.',
    'Early nights during Week 2. Sleep consolidates everything you have learned.',
    'No alcohol the night before any mock interview or the real interview.',
  ],
}
