data = {
    "about": ["I graduated from Cornell University with a Master's in Financial Engineering in December 2024. I am driven by a passion for quantitative research, data-driven decision-making, and financial markets. I am a highly motivated professional, bringing a unique blend of quantitative acumen, technical proficiency, and a strong work ethic to any organization. With a proven track record in finance and technology, I have successfully delivered value through structured financial product configuration, intricate payoff calculations, and risk analytics.",
        "",
        "During my tenure as an Application Consultant at FinIQ Consulting, I spearheaded high-impact projects, showcasing my analytical abilities and attention to detail. Leading training workshops and collaborating on complex initiatives highlight my leadership skills and proactive approach. Proficient in Python, R, and C/C++, I leverage technology to solve sophisticated financial challenges, from pricing models to systematic trading strategies.",
        "",
        "I am always eager to explore innovative approaches to quantitative finance and collaborate on impactful projects. My expertise spans derivatives pricing, risk management, machine learning applications in finance, and portfolio optimization.",
     ],
    "education":[
        {
            "school": "Cornell University",
            "location": " Ithaca, NY, USA",
            "from": "August 2023",
            "to": "December 2024",
            "degree": "Master of Engineering",
            "major": "Financial Engineering",
            "minor": "Operations Research and Information Engineering",
            "logo": "cornell.webp",
            "grade": "GPA: 3.8",
            "desc": [
                "Investment and Portfolio Management", "Machine Learning", "Derivatives Securities", "Stochastic Calculus", "Risk Management", "Python for Finance", "Monte Carlo Simulation"
            ],
        },{
            "school": "College of Engineering, Pune",
            "location": "Pune, Maharashtra, India",
            "from": "August 2017",
            "to": "May 2021",
            "degree": "Bachelor of Technology",
            "major": "Electronics and Telecommunication Engineering",
            "minor": "Computer Engineering",
            "logo": "COEP.webp",
            "grade": "GPA: 9.4/10, Rank: 1 (equivant to summa cum laude)",
            "desc": [
                "Linear Algebra", "Multivariate Calculus", "Differential Equations", "Data Structures", "Probability and Statistics", "Stochastic Processes", "Image Processing", "Information Theory", "Speech Processing"
			],
        }
	],
    "experience": [
        {
            "company": "Adaptive Investments",
            "role": "Quantitative Research Intern",
            "location": "Boston",
            "from": "June 2024",
            "to": "August 2024",
            "logo": "adaptive.jpg",
            "desc": [
                "Developed and refined mathematical models and algorithms for pricing, risk analytics and trade recommendations in Python.",
                "Implemented a calibrated Heston FFT pricer for equity structured notes, by deconstructing complex payoffs into European options, computing risk analytics (Greeks) analytically and numerically, achieving ~98% accuracy compared to Black-Scholes.",
                "Enhanced risk factor decomposition (market risk, idiosyncratic risk and isolated risk) and Credit Value Adjustment (CVA) calculations using hazard rates and survival probabilities to support more comprehensive portfolio risk management."
            ]
        },
        {
            "company": "FinIQ Consulting Pvt. Ltd.",
            "role": "Application Consultant",
            "location": "Pune",
            "from": "June 2021",
            "to": "June 2023",
            "logo": "FinIQ.jpg",
            "desc": [
                "Product developer (structurer) in a FinTech firm offering software solutions to clients trading complex structured equity derivatives.",
                "Developed path-dependent payoff models for OTC equity derivatives (Notes, Options, Swaps) to optimize pricing accuracy.",
                "Configured product lifecycle from RFQ acquisition, OMS workflow, to Murex booking, improving execution efficiency.",
                "Spearheaded the development of a multi-distributor trading system, increasing client trading volume by 30% through a $3.5M initiative, handling ~10,000 daily quote requests that were previously managed manually.",
                "Collaborated with clients on-site in Spain and Malaysia, engaging directly with their senior management and technical leads."
            ],
        },{
            "company": "FinIQ Consulting Pvt. Ltd",
            "role": "Software Engineering Intern",
            "location": "Pune",
            "from": "April 2020",
            "to": "June 2020",
            "logo": "FinIQ.jpg",
            "desc": [
				"Designed and implemented a comprehensive dashboard for Relationship Managers using HTML, CSS, and Django framework incorporating a live financial news feed by web scraping news articles to give insight into popularly traded stocks, indices, and commodities; termsheet document clustering using NLP and Scikit-Learn.",
				"Researched Quantum Computing and its applications in finance; and engaged in researching d3.js, exploring its capabilities across different use cases, and facilitating enhancement of the user experience of FinIQ's product offerings.",
			]
        }
	],
    "projects": [
        {
            "title": "Generating a Macroeconomic Narrative using Time Series Clustering",
            "from": "September 2024",
            "to": "December 2024",
            "logo": "greenmantle.webp",
            "metrics": {
                "accuracy": "92.3%",
                "features": "15+",
                "datasets": "5",
                "timeframe": "10 years"
            },
            "desc": [
                "Developed time-series clustering models on intraday futures data using K-Means and GMM to assess market reactions to macroeconomic events, leveraging feature engineering and event-type importance to extract key investment insights.",
                "Developed expertise in interpreting complex relationships within data using tools such as XGBoost, Decision Trees, and SHAP analysis, by identifying feature interactions and distinguishing unique patterns for refining systematic investment research.",
                "Analyzed over 50,000 data points across multiple asset classes including equity indices, commodities, and fixed income instruments to identify regime changes and market stress periods."
            ]
        },
        {
            "title": "Macroeconomic Indicators affecting 10Y Treasury Yield",
            "from": "September 2024",
            "to": "December 2024",
            "logo": "cornell.webp",
            "metrics": {
                "accuracy": "94.87%",
                "r_squared": "0.923",
                "mae": "0.12%",
                "features": "25"
            },
            "desc": [
                "Built and optimized XGBoost and LSTM model for explaining 10-Year Treasury Yields, achieving 94.87% accuracy; identifying critical macroeconomic drivers such as Fed Funds Rate, Inflation, and Bond Index to optimize forecasting precision.",
                "Implemented feature importance analysis revealing Fed Funds Rate (32% importance), CPI (28% importance), and Employment data (18% importance) as primary yield drivers.",
                "Developed real-time prediction pipeline processing 15+ economic indicators with sub-second latency for trading applications."
            ]
        },
        {
            "title": "Machine Learning Techniques for Stock Price Forecasting",
            "from": "September 2024",
            "to": "December 2024",
            "logo": "cornell.webp",
            "metrics": {
                "sharpe_ratio": "1.84",
                "accuracy": "78.5%",
                "max_drawdown": "8.2%",
                "stocks_analyzed": "500+"
            },
            "desc": [
                "Engineered CNN and Encoder-based models to predict stock prices with a 30-day forecast horizon; optimized convolutional layers, attention mechanisms, and hyperparameters, achieving robust trend prediction using advanced time series analysis.",
                "Backtested strategy on S&P 500 constituents achieving 1.84 Sharpe ratio with maximum drawdown of 8.2%, outperforming benchmark by 12.3% annually.",
                "Implemented ensemble methods combining LSTM, CNN, and Transformer architectures with dynamic weight allocation based on market volatility regimes."
            ]
        },
        {
            "title": "Dynamic Hedging using Black-Scholes-Merton model",
            "from": "November 2023",
            "to": "December 2023",
            "logo": "cornell.webp",
            "metrics": {
                "hedge_efficiency": "96.8%",
                "pnl_volatility": "2.1%",
                "transactions": "1000+",
                "options_priced": "50+"
            },
            "desc": [
                "Implemented pricing and delta-hedging of vanilla options using the Black-Scholes model, applying stochastic calculus techniques for risk-neutral valuation and dynamic position adjustments by creating a self-financing trading strategy.",
                "Achieved 96.8% hedge efficiency with PnL volatility of 2.1% through optimal rebalancing frequency analysis and transaction cost optimization.",
                "Extended framework to include gamma and vega hedging for complex option portfolios, reducing portfolio Greeks exposure by 85%."
            ]
        },{
            "title": "Child Cry Classification, Bird Song Classification",
            "from": "July 2020",
            "to": "April 2021",
            "logo": "FinIQ.jpg",
			"link": ["https://ieeexplore.ieee.org/document/9418129"],
            "metrics": {
                "accuracy": "99.56%",
                "precision": "98.9%",
                "recall": "99.1%",
                "f1_score": "99.0%"
            },
            "desc": [
				"V. Korde et al., 'Child Cry Classification - An Analysis of Features and Models', 2021 6th International Conference for Convergence in Technology (I2CT).",
                "Led a team of 4 to study and classify the characteristic features of audios by formulating machine learning and deep learning algorithms; achieved 99.56% accuracy using optimized CNN.",
                "Implemented advanced signal processing techniques including MFCC, spectral features, and wavelet transforms for robust audio feature extraction."
            ],
        }
    ],
    "leadership": [
        {
            "title": "Assistant Hiring Manager",
            "from": "August 2021",
            "to": "June 2023",
            "logo": "FinIQ.jpg",
            "desc": ["Actively participated online and on-campus hiring, interviewing 30+ students.",
			],
        },
        {
            "title": "Graduate Trainer",
            "from": "August 2021",
            "to": "June 2023",
            "logo": "FinIQ.jpg",
            "desc": ["Conducted technical training workshops for new hires: 50+ on-site and overseas employees.",
			],
        },
        {
            "title": "Student representative, Board of Studies",
            "from": "March 2019",
            "to": "March 2021",
            "logo": "COEP.webp",
            "desc": ["Actively participated in the review and evaluation of syllabus and curriculum with all department faculty at annual meetings to ensure their alignment with both - the industry standards and the needs of the student community.",
			],
        },{
            "title": "Campus Ambassador, National Engineering Olympiad",
            "from": "March 2020",
            "to": "April 2020",
            "logo": "COEP.webp",
            "desc": ["Encouraged participation in the Olympiad across multiple schools and departments, promoting a competitive spirit.",
            ],
        }
    ],
    "interests": ["Mensa (99+)", "Indian Classical Singing", "Photography", "Reading", "Learning Languages", "Ukulele"
	]
}