---
title: Prompt Filtering Research
sidebar_position: 1
---

### **AI/LLM Prompt Filtering: A Multi-layered Approach to Safety, Security, and Responsibility**

#### **Abstract**

As generative Artificial Intelligence (AI) and Large Language Models (LLMs) become increasingly integrated into enterprise and consumer applications, the need for robust filtering of user prompts and model outputs has become paramount[^1]. These systems must balance utility and freedom of expression with the imperative to prevent harmful, biased, or unauthorised content generation[^1]. This paper examines the multi-layered methodologies employed by AI/LLM clients to filter user requests and model responses, detailing a combination of **proactive guardrails**, such as system prompts and Constitutional AI, and **reactive mechanisms**, including content moderation APIs and adjustable filters[^1]. The analysis explores key challenges, including over-blocking, algorithmic bias, user-led 'jailbreaking' attempts, and the critical need for transparency[^1, 36]. Effective filtering requires a holistic approach that blends rule-based systems, machine learning classification, and policy enforcement, all underpinned by ongoing community collaboration and a commitment to ethical guidelines[^8, 9].

---

#### **1. Introduction**

The proliferation of generative AI is reshaping how organizations and individuals handle data, automate processes, and innovate[^10, 92]. However, this expanding capability introduces new security risks and ethical dilemmas, from the generation of harmful content to the potential for data leaks and unauthorised system actions[^10, 92, 201]. Consequently, a principled and efficient moderation solution is essential to ensure safety standards and responsible deployment[^201].

The core challenge lies in striking a delicate balance between preventing harmful outputs and preserving academic freedom, free expression, and overall model utility[^10, 63]. Overly restrictive filters can lead to user frustration over unexplained refusals, a phenomenon sometimes described by users as **'lobotomising' an otherwise powerful tool**[^10, 143]. Conversely, overly permissive settings risk abuse and brand damage[^10]. This tension affects every organisation deploying LLMs, creating a pressing need for collaboration across vendors, libraries, and researchers to address it[^63].

---

#### **2. Taxonomy of Filtering**

Filtering is a technique used by AI algorithms to analyse massive data sets to find specific information or patterns by eliminating irrelevant or duplicate data[^193]. In the context of LLMs, this involves both analysing user inputs and vetting model-generated outputs[^11]. Methodologies can be broadly categorised as:

*   **Rule-Based Filtering**: Works with a predefined set of rules or patterns to categorise data, useful for highly structured requirements[^12, 194].
*   **Content-Based Filtering**: Analyses the specific attributes of content to make decisions, often used in recommendation systems[^12, 194].
*   **Hybrid Filtering**: Combines multiple techniques to achieve more accurate results, especially with complex or incomplete data[^12, 194].

A foundational element of any filtering system is a well-defined **content taxonomy**[^12]. Designing a clear categorisation of undesired content is critical for achieving high inter-rater agreement during data labelling and for minimising ambiguity in automated systems[^12, 204]. For instance, the **Gemini API** uses categories such as Harassment, Hate Speech, Sexually Explicit, Dangerous, and Civic Integrity[^12, 125]. Similarly, **OpenAI** has developed a taxonomy with top-level categories for Sexual content, Hateful content, Violence, Self-harm, and Harassment, each with subcategories to capture varying levels of severity[^12, 211, 212, 213].

---

#### **3. Multi-Layered Filtering Methodologies**

Modern AI clients employ a multi-layered approach to content moderation, combining proactive mechanisms to guide model behaviour with reactive systems that block harmful content[^1, 13].

##### **3.1 Proactive Mechanisms: Guardrails and System Prompts**

**Guardrails** are proactive mechanisms implemented deep within the system architecture to prevent a model from generating undesired behaviour in the first place[^13, 64]. A primary form of guardrail is the **system prompt**, a set of hidden, often extensive instructions that dictate the AI's behaviour, tone, and boundaries[^1, 13].

*   A notable implementation is Anthropic's **"Constitutional AI"** for its Claude models, which uses a predefined constitution to guide the model's behaviour, including hardcoded rules like refusing to generate lyrics or malware[^1, 14]. This process involves two phases: supervised learning, where the model revises its own responses, and reinforcement learning using AI-generated feedback derived from those principles[^14, 293].
*   **ChatGPT** (OpenAI) relies on Reinforcement Learning from Human Feedback (RLHF) to adapt its tone while avoiding strong opinions and illegal content[^2].
*   Platforms like **Clarivate** use prompts to instruct LLMs to rely exclusively on scholarly sources via a Retrieval-Augmented Generation (RAG) architecture, thereby minimising the risk of problematic content from broader training data[^14, 66].

##### **3.2 Reactive Mechanisms: Content Filtering Pipelines**

**Content filtering** is a reactive mechanism that evaluates both user input and model-generated output to decide if it should be shown to the user[^67]. This process typically occurs in two stages:

1.  **Pre-Processing Inputs**: Before an LLM processes a user prompt, the request is scanned by classification models to detect harmful categories[^3, 15]. For example, **Azure OpenAI Service** uses a content filtering system that flags inputs for violence, self-harm, sexual content, and hate speech across four severity levels (safe, low, medium, high) and rejects prompts that trigger a block with an HTTP 400 error[^3, 15].
2.  **Post-Processing Outputs**: The model's response is evaluated using the same filters[^3, 16]. If the output is flagged, it may be truncated (indicated by a `finish_reason: content_filter` message in Azure) or replaced with a refusal message[^3, 16]. These filtering pipelines are standard features in cloud provider LLM services like Azure and AWS Bedrock[^16, 69].

##### **3.3 Adjustable and Dynamic Filtering**

To cater to different use cases, many platforms offer adjustable filtering settings.

*   **Severity Thresholds**: Administrators can configure the strictness of filters[^17]. For example, the **Gemini API** allows developers to set blocking thresholds for each harm category, with options like `BLOCK_NONE` and `BLOCK_MEDIUM_AND_ABOVE`[^17, 129]. This allows a video game developer to permit more content rated as "Dangerous" than an educational application would[^17, 126]. Azure also allows users to adjust severity tolerance thresholds[^80].
*   **Blocklists and Custom Rules**: Users can implement custom blocklists for specific keywords or domains[^5, 18]. More advanced systems use tools like **Permit.io**, which enables fine-grained Attribute-Based Access Control (ABAC) to restrict actions based on user roles or other attributes[^5, 18].
*   **Context-Aware Filtering**: Filtering logic can be designed to be context-aware, fetching rules from a central resource based on the user's context (e.g., 'development' versus 'production')[^18, 29]. For example, a request to "delete all user data" would be permissible in a development environment but blocked in production[^18, 32].

##### **3.4 Advanced Detection Techniques**

Beyond basic keyword and category filtering, advanced techniques are being deployed.

*   **Multimodal Analysis**: Models like Gemini can analyse text, images, and video to understand contextual harm[^4, 19].
*   **AI Security Features**: To combat adversarial attacks, services like **Azure AI Content Safety** offer tools including **prompt shields** for real-time detection of prompt injection attacks and **groundedness detection** to pinpoint ungrounded or "hallucinated" content[^19, 81, 82].
*   **Model Training and Data Handling**: The quality of filtering is heavily dependent on the model's training data. OpenAI employs a holistic approach involving **active learning** to find rare examples of undesired content, **synthetic data generation** to mitigate bias, and **human red-teaming** to uncover model weaknesses[^20, 207, 220, 230].

---

#### **4. Ethical Considerations and Key Challenges**

The implementation of filtering systems presents a double-edged sword, with the potential to protect users from harmful content while also risking censorship and bias[^41].

##### **4.1 Censorship and Over-blocking**

A primary concern is the potential for censorship, where algorithms mistakenly remove legitimate content ("over-moderation"), thereby restricting freedom of speech[^21, 37]. This can be frustrating for users and can block legitimate academic queries on topics like war crimes or civil rights history because they contain sensitive keywords[^21, 65, 71]. Users have reported instances where **Claude refused to write a negative Airbnb review** for a problematic guest on the grounds that it might hurt the guest's feelings[^21, 155].

##### **4.2 Bias and Fairness**

AI filtering systems can exhibit and perpetuate racial, gender, or ideological biases present in their training data, leading to unfair or discriminatory outcomes[^22, 38]. Filters trained predominantly on English data may perform poorly in other languages or cultural contexts[^6, 22]. Furthermore, a "one-size-fits-all" approach, such as that potentially risked by Constitutional AI, may enforce a universal set of values that suppresses diverse perspectives and marginalises other moral frameworks[^22, 303].

##### **4.3 Security and Evasion ('Jailbreaking')**

A persistent challenge is mitigating "jailbreak" attempts, where users craft prompts designed to bypass safety rules[^23, 83]. These tactics can range from **direct and indirect prompt injections** to more sophisticated model evasion and obfuscation tactics[^23, 83, 92, 112]. This creates a continuous "cat-and-mouse game" between developers strengthening defences and users on forums like Reddit actively sharing techniques to circumvent refusals[^23, 147, 158].

##### **4.4 Transparency and Accountability**

Many AI systems operate with a degree of opacity, as their system prompts and moderation rules are often not disclosed to the public[^5, 24]. This lack of transparency can lead to user frustration and makes it difficult to hold companies accountable[^24, 38]. Ethical guidelines recommend that companies openly communicate their moderation policies and provide clear avenues for users to appeal decisions[^40]. The Stanford Foundation Model Transparency Index, for example, gave Anthropic's Claude 2 a relatively low score of 36%[^301].

---

#### **5. Future Directions and Governance**

The field of AI filtering is evolving rapidly in response to technical challenges and regulatory pressures.

*   **Explainable Filtering**: To improve transparency, models like Gemini are being used to generate reasoning for why content was flagged, helping users and developers understand moderation decisions[^7, 25].
*   **Regulatory Compliance**: The AI landscape is increasingly shaped by regulations like the **EU AI Act** and the **Digital Services Act (DSA)**[^7, 25]. The EU AI Act, in particular, takes a risk-based approach, holding high-risk applications to a higher standard[^94].
*   **Community Collaboration**: There is a growing consensus that vendors, libraries, and the academic community must collaborate to define standards and share best practices[^26, 73]. Initiatives like the **Clarivate Academic AI working group** aim to foster this dialogue[^26, 74].
*   **Improved Training and Evaluation**: Future efforts will focus on continuous monitoring, systematic red-teaming to discover model weaknesses, and establishing rigorous, open-source benchmarks for evaluating issues like hallucination and bias[^26, 109].

---

#### **6. Conclusion**

Filtering user prompts and requests for AI/LLM clients is a complex, multi-faceted discipline essential for the responsible deployment of generative AI[^27, 198]. The current state-of-the-art involves a sophisticated blend of **proactive guardrails** and **reactive content filters**, combining predefined rules, machine learning classification, and dynamic policy enforcement[^8, 27].

However, significant challenges remain, centred on navigating the inherent tension between ensuring safety, promoting utility, and upholding principles of free expression and academic inquiry[^27, 41]. Issues of over-blocking, algorithmic bias, security vulnerabilities, and a lack of transparency continue to challenge developers and frustrate users[^27].

The path forward requires a collective and conscientious approach[^28, 41]. Progress will depend on a commitment to greater transparency, the development of explainable AI systems, and robust collaboration across the tech industry, academia, and regulatory bodies[^28, 335]. By fostering industry-wide ethical guidelines and shared standards, we can work towards ensuring that AI technologies serve as tools for positive change rather than sources of harm[^41].

***

### **References**

[^1]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^2]: Reddit user jake75604, "To the people who are in charge of ClaudeAI content moderation and filter department," *Reddit*, r/ClaudeAI, Excerpt.
[^3]: *What is Filtering | AI Basics*, Ai Online Course, Excerpt.
[^4]: *What is Filtering | AI Basics*, Ai Online Course, Excerpt.
[^5]: *Safety settings | Gemini API*, Google AI for Developers, Excerpt.
[^6]: Cristina Blanca-Sancho, "Guardrails for Responsible AI: Balancing Safety and Academic Discourse," *Clarivate*, Excerpt.
[^7]: *AI Content Filtering: Methods, Challenges, and Future*, Excerpt.
[^8]: *AI Content filtering: Methods, Challenges, and Future*, Excerpt.
[^9]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^10]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^11]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^12]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^13]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^14]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^15]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^16]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^17]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^18]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^19]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^20]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^21]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^22]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^23]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^24]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^25]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^26]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^27]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^28]: *AI/LLM Prompt Filtering: A Multi-layered Approach to Safety*, Excerpt.
[^29]: *Context-Aware AI Client Filtering with MCP Rules*, Excerpt.
[^30]: Reddit user TacticalRock, "To the people who are in charge of ClaudeAI content moderation and filter department," *Reddit*, r/ClaudeAI, Excerpt.
[^31]: Aman Priyanshu, Yash Maurya, & Zuofei Hong, "AI Governance and Accountability: An Analysis of Anthropic’s Claude," *arXiv:2407.01557v1*, Excerpt.
[^32]: Lara Garrido, "Ethical Consideration in AI Content Moderation : Avoiding Censorship and Biais," *Checkstep*, Excerpt.
[^33]: *AI Content Filtering: Methods, Challenges, and Future*, Excerpt.
[^34]: Matthew Schwartz and Mac Stevens, "Navigating the security landscape of generative AI," *AWS Whitepaper*, Excerpt.
[^35]: Cristina Blanca-Sancho, "Guardrails for Responsible AI: Balancing Safety and Academic Discourse," *Clarivate*, Excerpt.
[^36]: Lara Garrido, "Ethical Consideration in AI Content Moderation : Avoiding Censorship and Biais," *Checkstep*, Excerpt.