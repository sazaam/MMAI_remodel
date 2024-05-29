module.exports = {
    nav_wallet:`{
        "sections": [
            {
                "id": "1",
                "name": "wallet",
                "path": "wallet/",
                "page": {
                    "id": "1",
                    "template": {
                        "id": "1",
                        "name": "top",
                        "behavior": {
                            "@focus": "top_section_focus",
                            "@toggle": "top_section_togle"
                        }
                    }
                },
            }
        ]
    }`,
    nav:`{
        "sections": [
            {
                "id": "1",
                "name": "home",
                "path": "home/",
                "page": {
                    "id": "1",
                    "template": {
                        "id": "1",
                        "name": "top",
                        "behavior": {
                            "@focus": "home_focus",
                            "@toggle": "home_toggle"
                        }
                    }
                },
                "children":[
                    {
                        "id": "101",
                        "name": "purechain",
                        "path": "home/purechain/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "home_children_focus",
                                    "@toggle": "home_children_toggle"
                                }
                            }
                        }
                        
                    },
                    {
                        "id": "102",
                        "name": "purewallet",
                        "path": "home/purewallet/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "home_children_focus",
                                    "@toggle": "home_children_toggle"
                                }
                            }
                        }
                        
                    },
                    {
                        "id": "103",
                        "name": "pureseries",
                        "path": "home/pureseries/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "home_children_focus",
                                    "@toggle": "home_children_toggle"
                                }
                            }
                        }
                        
                    },
                    {
                        "id": "104",
                        "name": "pureworld",
                        "path": "home/pureworld/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "home_children_focus",
                                    "@toggle": "home_children_toggle"
                                }
                            }
                        }
                        
                    }
                ]
            },
            {
                "id": "2",
                "name": "wallet",
                "path": "wallet/",
                "page": {
                    "id": "2",
                    "template": {
                        "id": "1",
                        "name": "top",
                        "behavior": {
                            "@focus": "top_section_focus",
                            "@toggle": "top_section_toggle"
                        }
                    }
                }
            },
            {
                "id": "3",
                "name": "series",
                "path": "series/",
                "page": {
                    "id": "3",
                    "template": {
                        "id": "1",
                        "name": "top",
                        "behavior": {
                            "@focus": "top_section_focus",
                            "@toggle": "top_section_toggle"
                        }
                    }
                },
                "children":[
                    {
                        "id": "301",
                        "name": "purechain",
                        "path": "series/purechain/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "series_children_focus",
                                    "@toggle": "series_children_toggle"
                                }
                            }
                        }
                        
                    },
                    {
                        "id": "302",
                        "name": "purewallet",
                        "path": "series/purewallet/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "series_children_focus",
                                    "@toggle": "series_children_toggle"
                                }
                            }
                        }
                        
                    },
                    {
                        "id": "303",
                        "name": "purecontract",
                        "path": "series/purecontract/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "series_children_focus",
                                    "@toggle": "series_children_toggle"
                                }
                            }
                        }
                        
                    },
                    {
                        "id": "304",
                        "name": "purecertificate",
                        "path": "series/purecertificate/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "series_children_focus",
                                    "@toggle": "series_children_toggle"
                                }
                            }
                        }
                        
                    },
                    {
                        "id": "305",
                        "name": "purevoting",
                        "path": "series/purevoting/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "series_children_focus",
                                    "@toggle": "series_children_toggle"
                                }
                            }
                        }
                        
                    },
                    {
                        "id": "306",
                        "name": "puremedia",
                        "path": "series/puremedia/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "series_children_focus",
                                    "@toggle": "series_children_toggle"
                                }
                            }
                        }
                        
                    },
                    {
                        "id": "307",
                        "name": "purerx",
                        "path": "series/purerx/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "series_children_focus",
                                    "@toggle": "series_children_toggle"
                                }
                            }
                        }
                        
                    },
                    {
                        "id": "308",
                        "name": "pureboms",
                        "path": "series/pureboms/",
                        "page": {
                            "template": {
                                "behavior": {
                                    "@focus": "series_children_focus",
                                    "@toggle": "series_children_toggle"
                                }
                            }
                        }
                        
                    }
                ]
            }, 
            {
                "id": "4",
                "name": "learn",
                "path": "learn/",
                "page": {
                    "id": "4",
                    "template": {
                        "id": "1",
                        "name": "top",
                        "behavior": {
                            "@focus": "top_section_focus",
                            "@toggle": "top_section_toggle"
                        }
                    }
                }
            },
            {
                "id": "5",
                "name": "MMAI",
                "path": "mmai/",
                "page": {
                    "id": "5",
                    "template": {
                        "id": "2",
                        "name": "top",
                        "behavior": {
                            "@focus": "top_section_focus",
                            "@toggle": "top_section_toggle"
                        }
                    }
                }
            },
            {
                "id": "6",
                "name": "faq",
                "path": "faq/",
                "data": {
                    "hidefrommenu":true
                },
                "page": {
                    "id": "5",
                    "template": {
                        "id": "2",
                        "name": "top",
                        "behavior": {
                            "@focus": "top_section_focus",
                            "@toggle": "top_section_toggle"
                        }
                    }
                }
            },
            {
                "id": "7",
                "name": "legal",
                "path": "legal/",
                "data": {
                    "hidefrommenu":true
                },
                "page": {
                    "id": "6",
                    "template": {
                        "id": "2",
                        "name": "top",
                        "behavior": {
                            "@focus": "top_section_focus",
                            "@toggle": "top_section_toggle"
                        }
                    }
                }
            },
            {
                "id": "8",
                "name": "research",
                "path": "research/",
                "data": {
                    "hidefrommenu":true
                },
                "page": {
                    "id": "7",
                    "template": {
                        "id": "2",
                        "name": "top",
                        "behavior": {
                            "@focus": "top_section_focus",
                            "@toggle": "top_section_toggle"
                        }
                    }
                }
            }
        ]
    }`,
    footnav:`{
        "footlinks": [
            {
                "name": "Headquarters",
                "children":[
                    {
                        "name":"adress",
                        "content":"1570 N Batavia St <br />Orange, CA<br />92867"
                    }
                ]
            },
            {
                "name": "Partners",
                "children":[
                    {
                        "name":"creativia",
                        "content":"Creativia",
                        "link":"#"
                    },
                    {
                        "name":"ictc",
                        "content":"ICT Convergence",
                        "link":"#"
                    },
                    {
                        "name":"researchcenter",
                        "content":"Research Center",
                        "link":"#"
                    },
                    {
                        "name":"nslab",
                        "content":"NS Lab",
                        "link":"#"
                    },
                    {
                        "name":"cognitgo",
                        "content":"Cognitgo",
                        "link":"#"
                    }
                ]
            },
            {
                "name": "Research",
                "children":[
                    {
                        "name":"patents-and-papers",
                        "content":"Patents and Papers",
                        "link":"/research/"
                    }
                ]
            },
            {
                "name": "Help",
                "children":[
                    {
                        "name":"faq",
                        "content":"FAQ",
                        "link":"/faq/"
                    },
                    {
                        "name":"support",
                        "content":"Support",
                        "link":"/support/"
                    },
                    {
                        "name":"tnc",
                        "content":"Terms and Conditions",
                        "link":"/legal/"
                    }
                ]
            }
        ]
    }`,
    pureseries:`{
        "intro":{
            "title":"#[b.pureblue Versatile] and Growing #[br] Frameworks",
            "intro":"Pure series represents the evergrowing global network#[br] behind Pure chain and its sibling services.#[br]Grasp the modern concepts of this blockchain phenomenon."
        },
        "series":[
            {
                "id":"0",
                "path":"purechain/",
                "name":"#[b.bolder Pure] #[span Chain]",
                "desc":{
                    "title":"Improved Performance over Traditional Blockchains",
                    "content":"We utilize exclusive technologies to addres blockchain challenges (decentralization, security, scalability, high gas fees) and provide a real-time environment."
                },
                "blocks":[
                    {
                        "nickname":"SAM#[sup +]",
                        "title":"Smart Auto Mining#[sup +]",
                        "feature":"A mining technique that optimizes transaction mining time and reduces the energy required to power the network.",
                        "utilizes":"Exchange Module • Orderbook Primitive • Oracle Module"
                    },
                    {
                        "nickname":"PoA#[sup 2]",
                        "title":"Proof of Authority#[sup 2]",
                        "feature":"A tehnique that ensures network stability even when or if mining is interrupted.",
                        "utilizes":"CosmWasm Module • Exchange Module • Orderbook Primitive"
                    },
                    {
                        "nickname":"NSL-L2",
                        "title":"NSL Layer2",
                        "feature":"A technology that uses Zero-Knowledge (Zk)- Rollup technology with SAM+ and PoA2 to improve blockchain stabilityand gas fees. ",
                        "utilizes":"CosmWasm Module • Exchange Module • Orderbook Primitive"
                    },
                    {
                        "nickname":"L1#[sup +]",
                        "title":"Augmented Layer1",
                        "feature":"A layer that integrates SAM+ and PoA2 to enhance both efficiency and reliability of the existing blockchain's Layer1.",
                        "utilizes":"CosmWasm Module • Exchange Module • Orderbook Primitive"
                    },
                    {
                        "nickname":"NSL-cL2",
                        "title":"Centralized Layer2",
                        "feature":"A specialized Layer2 for industrial applications.",
                        "utilizes":"CosmWasm Module • Exchange Module • Orderbook Primitive"
                    }
                ]
            },
            {
                "id":"1",
                "path":"purewallet/",
                "name":"#[b.bolder Pure] #[span Wallet]",
                "desc":{
                    "title":"Offline Transaction",
                    "content":"Technology that increases security and real-time in token-based transactions. Hardware-Free Cold Storage, Strong security, Seamless payments Real-time transaction, Reduce transaction costs"
                },
                "blocks":[
                    {
                        "title":"Offline Token",
                        "feature":"Offline Token for transfer  cryptocurrency data in real-time and without network"
                    },
                    {
                        "title":"Hardware-Free Cold Storage",
                        "feature":"Provides offline token-based software cold storage rather than a general hardware-based cold storage method."
                    },
                    {
                        "title":"Split Token",
                        "feature":"New tokens are registered and  generated within the blockchain,  so they cost gas fee. However,  it provides technology to generate tokens in an off-chain environment"
                    },
                    {
                        "title":"Augmented Layer1",
                        "feature":"A layer that integrates SAM+ and PoA2 to enhance both efficiency and reliability of the existing blockchain's Layer1."
                    },
                    {
                        "title":"Connect",
                        "feature":"Provides connect other Web3.0 application using user wallet information User can experience Web3.0 world with PureWallet."
                    }
                ]
            },
            {
                "id":2,
                "path":"purecontract/",
                "name":"#[b.bolder Pure] #[span Contract]",
                "desc":{
                    "title":"Standard Electronic Contract System Based on Blockchain",
                    "content":"Technology that increases security and real-time in token-based transactions. Blockchain technology-based data processing technology provides transparent and fair contract procedure services by securing the characteristics of electronic, automation, and standardization of the contract system"
                },
                "blocks":[
                    {
                        "title":"Contract",
                        "feature":"Implementation of authentication and electronic signature management for contracts using smart contracts, and use IPFS technology for distributed storage and verification of contract details and history."
                    },
                    {
                        "title":"Automatic contract creation by user input and selection",
                        "feature":"Offer various contract document formats based on standard forms and automatically calculate items like contract amount and period based on user inputs."
                    },
                    {
                        "title":"Ensure fair contract proceedings through mutual consultation between the parties",
                        "feature":"Implementation of a consultation that allows documentation creation and modification to be signed by both parties to the contract only after cross-approval."
                    },
                    {
                        "title":"Final contract forgery verification",
                        "feature":"A layer that integrates SAM+ and PoA2 to enhance both efficiency and reliability of the existing blockchain's Layer1."
                    }
                ]
            },
            {
                "id":"3",
                "path":"purecertificate/",
                "name":"#[b.bolder Pure] #[span Certificate]",
                "desc":{
                    "title":"Robust Originality Guarantee Based on 3 Technologies",
                    "content":"Strong data encryption, creation of original file metadata, and detection of forgery through hash value comparison considering the content and characteristics of the data to ensure the authenticity of the test certificates.#[br]#[br]Exam certificates issued by Pure Certificate are safe to use. NS Lab issues transcripts only with unaltered files and ensuring reliability."
                },
                "blocks":[
                    {
                        "title":"Data Protection",
                        "feature":"Fast and efficient encryption and decryption are achieved through two-way encryption, with data protection enhanced by security level settings."
                    },
                    {
                        "title":"Original File Metadata",
                        "feature":"Guarantees the original's integrity through metadata based on the block hash algorithm."
                    },
                    {
                        "title":"Forgery Detection",
                        "feature":"Forgery detection based on the perceptual hash algorithm. Forgery detection based on the perceptual hash algorithm."
                    }
                ]
            },
            {
                "id":"4",
                "path":"purevoting/",
                "name":"#[b.bolder Pure] #[span Voting]",
                "desc":{
                    "title":"Secure Data Management",
                    "content":"Addresses voter concerns about privacy and ensures anonymity for the fairness of voting. #[br]#[br] Pure Voting converts and stores the votes through NS Lab's blockchain hash algorithm, making data forgery impossible. Multiple networked computer nodes maintain and update the distributed ledger simultaneously, enabling parallel processing and real-time documentation. This collaboration enhances the efficiency and accuracy of the voting system by shortening the processing time for voting results."
                },
                "blocks":[
                    {
                        "title":"Offline Electronic Voting",
                        "feature":"Secure voting in a WLAN based offline environment"
                    },
                    {
                        "title":"Reliable Offline Tokens",
                        "feature":"Enhanced reliability of the election data through blockchain offline transactions."
                    },
                    {
                        "title":"Hybrid Blockchain",
                        "feature":"Enhanced reliability through a private blockchain, preservation of voting results through a public blockchain."
                    }
                ]
            },
            {
                "id":"5",
                "path":"puremedia/",
                "name":"#[b.bolder Pure] #[span Media]",
                "desc":{
                    "title":"Copyright Checks Using Metadata",
                    "content":"Conducts audio similarity checks by extracting unique metadata from audio files and comparing them. #[br]#[br]Blockchain-based metadata disclosure of audio uploaded by users allows users to see the history of modifications and changes to their audio, ensuring audio transparency and determining the time of composition."
                },
                "blocks":[
                    {
                        "title":"Similarity Check",
                        "feature":"Similarity check based on audio metadata."
                    },
                    {
                        "title":"Private Blockchain",
                        "feature":"Enhancing integrity through metadata storage on private blockchain and saving gas fees."
                    },
                    {
                        "title":"Web-Based Data Disclosure",
                        "feature":"Enhanced transparency through the disclosure of block data on a private blockchain."
                    }
                ]
            },
            {
                "id":"6",
                "path":"purerx/",
                "name":"#[b.bolder Pure] #[span RX]",
                "desc":{
                    "title":"An NFT-Prescription Management for Efficient and Secure Healthcare System",
                    "content":"A novel approach that leverages blockchain technology to innovate prescription services. PureRx solves the problems of traditional paper-based prescription systems, and improves efficiency, quality, and security."
                },
                "blocks":[
                    {
                        "title":"Patient-centric Approach",
                        "feature":"Adopt a patient-centric approach to enable patients to directly manage their prescription records and enhance security and privacy."
                    },
                    {
                        "title":"Non-Fungible tokens (NFTs)",
                        "feature":"Non-fungible tokens (NFTs) in Pure Rx give patients ownership and control over their health information, shifting data protection responsibility from centralized entities to individuals, and enhancing data transparency and interoperability."
                    },
                    {
                        "title":"Lightweight Blockchain Technology",
                        "feature":"Introducing lightweight blockchain technology improves cost efficiency and security, and simplifies prescription data management. Adoption of these technologies provides traceability, auditability, and efficient prescription content management."
                    }
                ]
            },
            {
                "id":"7",
                "path":"pureboms/",
                "name":"#[b.bolder Pure] #[span BOMS]",
                "desc":{
                    "title":"Blockchain-enabled Organ #[br]Matching System",
                    "content":"Pure BOMS revolutionizes organ transplants through blockchain-enabled organ matching, ensuring immutable and transparent record keeping of donor-beneficiary pairs. #[br] #[br] Transparency and security define the transplant process by ensuring accountability and integrity, with every step recorded on the blockchain, from donor registration to organ matching."
                },
                "blocks":[
                    {
                        "title":"Blockchain-based systems",
                        "feature":"Conducts audio similarity checks by extracting unique metadata from audio files and comparing them."
                    },
                    {
                        "title":"Smart Contracts",
                        "feature":"Integrate matching algorithms and procedures into smart contracts for immutable and transparent management. #[br]Use SolidCheck to validate the security of the smart contracts."
                    },
                    {
                        "title":"Matching Algorithm",
                        "feature":"Optimal matching is based on donors' and recipients' biological compatibility, considering location, fairness, and registered beneficiaries."
                    },
                    {
                        "title":"Transparency and Traceability",
                        "feature":"All processes, from registration to transplantation, are recorded on the blockchain for complete traceability, with open-source smart contracts available for public verification."
                    },
                    {
                        "title":"Data Privacy",
                        "feature":"Use blockchain addresses to ensure participants' privacy while maintaining transparency. The matching algorithm processes plaintext data with an identity-protecting mechanism."
                    },
                    {
                        "title":"Automated Alerts",
                        "feature":"Automatically send notifications to relevant stakeholders when a suitable match is found."
                    },
                    {
                        "title":"User Interface",
                        "feature":"Web-based applications facilitate user interaction with blockchain smart contracts, offering a user-friendly interface."
                    },
                    {
                        "title":"Integrating Fairness and #[br]Biological Factors",
                        "feature":"Matching considering biological factors (blood type, HLA match, age, organ size, etc.). #[br] Double testing increases the probability of successful transplantation."
                    }
                ]
            }
        ]
    }`
}