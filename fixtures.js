module.exports = {
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
                "name": "features",
                "path": "features/",
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
                }
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
                "id": "6",
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
                "id": "7",
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
            "title":"Versatile and Growing #[br] Frameworks"
        },
        "series":[
            {
                "id":0,
                "name":"Pure Chain"
            },
            {
                "id":1,
                "name":"Pure Wallet"
            }
        ]
    }`
}