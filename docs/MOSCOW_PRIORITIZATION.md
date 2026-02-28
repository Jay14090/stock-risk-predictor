# 🎯 MoSCoW Prioritization — Stock Risk Predictor

> Prioritization of all 25 user stories using the **MoSCoW** method.

---

## ✅ Must Have (12 stories)

> **Critical for MVP.** The application cannot launch without these features.

| ID | Story Title | Justification |
|----|------------|---------------|
| US-01 | User Registration | Core — users must be able to create accounts |
| US-02 | User Login | Core — authentication is fundamental |
| US-05 | Portfolio Overview Dashboard | Core — primary user interface |
| US-08 | Create Portfolio | Core — central feature of the application |
| US-09 | Add Stocks to Portfolio | Core — portfolios are useless without stocks |
| US-10 | Remove Stocks from Portfolio | Core — users must manage their holdings |
| US-12 | Delete Portfolio | Core — basic CRUD operation |
| US-13 | Stock Search | Core — users need to find stocks |
| US-14 | View Stock Details | Core — informed decision-making requires data |
| US-16 | Monte Carlo Simulation | Core — primary risk analysis feature |
| US-17 | Value at Risk (VaR) | Core — industry-standard risk metric |
| US-18 | Volatility Analysis | Core — fundamental risk measurement |
| US-24 | Configure API Keys | Core — app cannot function without data APIs |

---

## 🔶 Should Have (7 stories)

> **Important but not critical.** Can be delivered shortly after MVP.

| ID | Story Title | Justification |
|----|------------|---------------|
| US-03 | User Profile Management | Important for UX but not blocking core features |
| US-04 | Password Reset | Security best practice; can use manual reset initially |
| US-06 | Real-Time Market Summary | Enhances dashboard but portfolio risk works without it |
| US-11 | Edit Stock Holdings | Users can delete/re-add as workaround initially |
| US-15 | Historical Price Charts | Useful context but risk analysis works without it |
| US-21 | Set Risk Alert Thresholds | Proactive monitoring; users can check dashboard manually |
| US-22 | In-App Risk Notifications | Delivery mechanism for alerts; manual checking works |
| US-23 | Generate PDF Risk Report | High value for professional users; export can come post-MVP |

---

## 🔵 Could Have (4 stories)

> **Nice to have.** Will be included if time and resources permit.

| ID | Story Title | Justification |
|----|------------|---------------|
| US-07 | Risk Score Widget | Visual enhancement; score shown elsewhere on dashboard |
| US-19 | Portfolio Correlation Matrix | Advanced analysis; core VaR/volatility sufficient for MVP |
| US-20 | Scenario Stress Testing | Advanced feature; Monte Carlo covers basic scenario analysis |
| US-25 | Dark/Light Theme Toggle | UX polish; dark theme works as default |

---

## ❌ Won't Have (this release)

> **Out of scope for v1.0.** Planned for future releases.

| Feature | Rationale |
|---------|-----------|
| Mobile app (iOS/Android) | Web app is sufficient for MVP; responsive design covers mobile browsers |
| Social/community features | Focus on individual analysis; community features add complexity |
| Options & derivatives analysis | Scope limited to stocks for v1.0; derivatives require significant additional modeling |
| Cryptocurrency support | Different data sources and volatility models; planned for v2.0 |
| Multi-language support (i18n) | English-only for initial release |
| Email notifications | In-app notifications sufficient; email requires additional infrastructure |
| Third-party brokerage integration | Regulatory and API complexity; manual portfolio entry works for MVP |

---

## 📊 Priority Distribution

```
Must Have:    12 stories (48%) ████████████████████████
Should Have:   8 stories (32%) ████████████████
Could Have:    4 stories (16%) ████████
Won't Have:    1 category  (4%) ██
```

| Priority | Count | Percentage |
|----------|-------|------------|
| **Must Have** | 12 | 48% |
| **Should Have** | 8 | 32% |
| **Could Have** | 4 | 16% |
| **Won't Have** | — | Future releases |

> **Note:** The Must/Should split follows the recommended 60/40 rule for agile prioritization, ensuring the MVP is focused yet comprehensive enough to deliver real value.
