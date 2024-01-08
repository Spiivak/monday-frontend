const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
]

const gColors = [
  '#ffcb00',
  '#007038',
  '#469e9b',
  '#579bfc',
  '#9aadbd',
  '#bba5e8',
  '#8050ab',
  '#4f3a65',
  '#92334c',
  '#bb3354',
  '#ff7575',
]

const demoData = [
  {
    _id: 'b101',
    title: 'Monday Management',
    archivedAt: Date.now(),
    createdBy: {
      _id: 'u1',
      fullname: 'Nave David',
      username: 'navedavid@gmail.com',
      imgUrl:
        'https://res.cloudinary.com/donnezwy9/image/upload/v1704455572/rzddgfxj4fzkcn6eqgrv.jpg',
    },
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
      {
        id: 'l102',
        title: 'Progress',
        color: '#61bd33',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'test teston',
        imgUrl: 'http://some-img',
      },
    ],
    groups: [
      {
        id: 'g101',
        title: 'Project Initialization',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c101',
            title: 'Create project board',
            statusc1: 'Stuck',
            datec3: 1704355563730,
            timelinec5: [1704355563730, 1704528363730],
            filec6: '',
            descriptionc4: 'Demodata',
            membersc2: [
              {
                _id: 'u1',
                fullname: 'Nave David',
                username: 'navedavid@gmail.com',
                imgUrl:
                  'https://res.cloudinary.com/donnezwy9/image/upload/v1704455572/rzddgfxj4fzkcn6eqgrv.jpg',
              },
              {
                _id: 'u2',
                fullname: 'Dima Revelson',
                username: 'dimarevelson@gmail.com',
                imgUrl:
                  'https://res.cloudinary.com/donnezwy9/image/upload/v1704459492/mv8vwh55b3wgqdflmemw.png',
              },
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                username: 'emilyKristensen@gmail.com',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
              },
            ],
            comments: [
              {
                id: 'cm1',
                user: {
                  _id: 'u1',
                  fullname: 'Nave David',
                  username: 'navedavid@gmail.com',
                  imgUrl:
                    'https://res.cloudinary.com/donnezwy9/image/upload/v1704455572/rzddgfxj4fzkcn6eqgrv.jpg',
                },
                msg: 'Mister biton ya gever',
                createdAt: 1589983468418,
                likes: 3,
                seen: ['u1', 'u2'],
              },
            ],
          },
          {
            id: 'c105',
            title: 'Define projects goal',
            statusc1: 'Working on it',
            datec3: 1704441963730,
            filec6: '',
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                username: 'emilyKristensen@gmail.com',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
              },
            ],
            filesc6: {
              imgUrl:
                'https://res.cloudinary.com/donnezwy9/image/upload/v1704615276/oqjwh1iue57jvwmydje9.png',
              publicId: 'oqjwh1iue57jvwmydje9',
            },
          },
          {
            id: 'c107',
            title: 'Assamble project team',
            statusc1: 'Done',
            datec3: 1704528363730,
            timelinec5: [1704355563730, 1704528363730],
            descriptionc4: 'Centering a div is hard!',
            filec6: '',
            membersc2: [],
          },
          {
            id: 'c108',
            title: 'Set up communication channels',
            statusc1: 'Stuck',
            datec3: 1704528363730,
            timelinec5: [1704355563730, 1704528363730],
            descriptionc4: 'Centering a div is hard!',
            filec6: '',
            membersc2: [],
          },
          {
            id: 'c500',
            title: 'Adding a task',
            statusc1: 'Done',
            datec3: 1704528363730,
            timelinec5: [1704355563730, 1704528363730],
            descriptionc4: 'Just added a line!',
            filec6: '',
            membersc2: [],
          },
        ],
        style: {
          color: '#ffcb00',
        },
      },

      {
        id: 'g102',
        title: 'Planning Phase',
        tasks: [
          {
            id: 'c103',
            title: 'Conduct Project Kick-off Meeting',
            statusc1: "Haven't Started",
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c104',
            title: 'Define Project Scope',
            statusc1: 'Done', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c105',
            title: 'Develop Project Schedule',
            statusc1: 'Stuck',
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c106',
            title: 'Identify Stakeholders',
            statusc1: "Haven't Started",
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c107',
            title: 'Establish Budget',
            statusc1: 'Done',
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c108',
            title: 'Risk Assessment and Mitigation Planning',
            statusc1: 'Done',
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
        ],
        style: { color: '#007038' },
      },

      {
        id: 'g103',
        title: 'Research and Analysis:',
        tasks: [
          {
            id: 'c108',
            title: 'Market Research',
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c109',
            title: 'Competitor Analysis',
            statusc1: 'Working on it', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c110',
            title: 'User Requirements Gathering',
            statusc1: 'Working on it', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c111',
            title: 'Technology Assessment',
            statusc1: 'Working on it', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
        ],
        style: { color: '#8050ab' },
      },

      {
        id: 'g104',
        title: 'Design and Architecture:',
        tasks: [
          {
            id: 'c112',
            title: 'Create System Architecture',
            statusc1: 'Stuck',
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c113',
            title: 'User Interface (UI) Design',
            statusc1: 'Stuck', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c114',
            title: 'User Experience (UX) Design',
            statusc1: 'Done', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c115',
            title: 'Database Design',
            statusc1: 'Done', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
        ],
        style: { color: '#579bfc' },
      },

      {
        id: 'g105',
        title: 'Development:',
        tasks: [
          {
            id: 'c116',
            title: 'Setup Development Environments',
            statusc1: 'Stuck',
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c117',
            title: 'Code Development',
            statusc1: 'Done', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c118',
            title: 'Unit Testing',
            statusc1: 'Working on it', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c119',
            title: 'Continuous Integration Setup',
            statusc1: 'Done', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
        ],
        style: { color: '#92334c' },
      },

      {
        id: 'g106',
        title: 'Quality Assurance (QA):',
        tasks: [
          {
            id: 'c120',
            title: 'Test Planning',
            statusc1: 'Done',
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c121',
            title: 'Test case development',
            statusc1: 'Done',
            membersc2: [],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c122',
            title: 'Functional testing',
            statusc1: 'Done',
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c123',
            title: 'Performance Testing',
            statusc1: 'Done',
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c124',
            title: 'User Acceptance Testing (UAT)',
            statusc1: 'Working on it', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
        ],
        style: { color: '#ff7575' },
      },

      {
        id: 'g107',
        title: 'Deployment:',
        statusc1: 'Done',
        tasks: [
          {
            id: 'c125',
            title: 'Deployment Planning',
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c126',
            title: 'Production Environment Setup',
            statusc1: 'Stuck',
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c127',
            title: 'System Deployment',
            statusc1: 'Stuck',
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c128',
            title: 'Post-Deployment Testing',
            statusc1: 'Stuck',
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
        ],
        style: {},
      },

      {
        id: 'g108',
        title: 'Documentation::',
        tasks: [
          {
            id: 'c128',
            title: 'Technical Documentation',
            statusc1: 'Stuck',
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c129',
            title: 'User Manuals',
            statusc1: 'Working on it',
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c300',
            title: 'Knowledge Transfer Sessions',
            statusc1: 'Working on it', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
        ],
        style: { color: '#ffcb00' },
      },

      {
        id: 'g109',
        title: 'Training:',
        tasks: [
          {
            id: 'c130',
            title: 'End-User Training',
            statusc1: 'Working on it',
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c131',
            title: 'Admin Training',
            statusc1: 'Working on it', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c132',
            title: 'Training Material Preparation',
            statusc1: 'Working on it', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
        ],
        style: { color: '#9aadbd' },
      },

      {
        id: 'g110',
        title: 'Maintenance and Support::',
        tasks: [
          {
            id: 'c133',
            title: 'Establish Support Processes',
            statusc1: 'Working on it', // monday
            archivedAt: 1589983468418,
            membersc2: [],
            timelinec5: [1704528729979, 1735719129979],
          },
          {
            id: 'c134',
            title: 'Bug Tracking and Resolution',
            statusc1: 'Working on it', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
          {
            id: 'c135',
            title: 'Continuous Improvement',
            statusc1: 'Working on it', // monday
            membersc2: [
              {
                _id: 'u3',
                fullname: 'Emily Kristensen',
                imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                username: 'emilyKristensen@gmail.com',
              },
              {
                _id: 'u4',
                fullname: 'Isabelle Anderson',
                imgUrl: 'https://randomuser.me/api/portraits/med/women/83.jpg',
                username: 'isabelle.anderson@example.com',
              },
            ],

            priority: 'high',
            descriptionc4: 'description',
            style: {
              backgroundColor: '#26de81',
            },
          },
        ],
        style: { color: '#bba5e8' },
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        group: {
          id: 'g101',
          title: 'Urgent Stuff',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],

    cmpsOrder: [
      { type: 'StatusPicker', id: 'c1', title: 'Status' },
      { type: 'MemberPicker', id: 'c2', title: 'Person' },
      { type: 'DatePicker', id: 'c3', title: 'Date' },
      { type: 'DescriptionPicker', id: 'c4', title: 'Description' },
      { type: 'TimelinePicker', id: 'c5', title: 'Timeline' },
      { type: 'FilePicker', id: 'c6', title: 'Files' },
    ],
  },
]

// import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'

// for cookies
// const axios = Axios.create({
//   withCredentials: true,
// })

const BASE_URL = 'board/'
const STORAGE_KEY = 'boardDB'

_demoDataLocalStorage()

export const boardService = {
  query,
  getById,
  save,
  remove,
  getById,
  addGroup,
  updateGroup,
  removeGroup,
  updateTask,
  addTask,
  removeTask,
  addColumn,
  removeColumn,
  updateColumn,
  getEmptyBoard,
  getEmptyGroup,
  geColors,
}

function query() {
  return storageService.query(STORAGE_KEY)
  // return httpService.get(BASE_URL, { filterBy, sortBy, owner, page })
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
  // return httpService.get(BASE_URL + boardId)
}

function remove(boardId) {
  return storageService.remove(STORAGE_KEY, boardId)
  // return httpService.delete(BASE_URL + boardId)
}

function save(board) {
  if (board._id) {
    return storageService.put(STORAGE_KEY, board)
    // return httpService.put(BASE_URL, board)
  } else {
    return storageService.post(STORAGE_KEY, board)
    // return httpService.post(BASE_URL, board)
  }
}
// * Groups
function addGroup(boardId, group) {
  return storageService.postGroup(STORAGE_KEY, boardId, group)
}

function updateGroup(boardId, groupId, group) {
  return storageService.putGroup(STORAGE_KEY, boardId, groupId, group)
}

function removeGroup(boardId, groupId) {
  return storageService.removeGroup(STORAGE_KEY, boardId, groupId)
}

// * Tasks

function updateTask(boardId, groupId, taskId, task) {
  return storageService.putTask(STORAGE_KEY, boardId, groupId, taskId, task)
}

function addTask(boardId, groupId, task) {
  return storageService.postTask(STORAGE_KEY, boardId, groupId, task)
}

function removeTask(boardId, groupId, taskId) {
  return storageService.removeTask(STORAGE_KEY, boardId, groupId, taskId)
}

// * Columns

function addColumn(boardId, column) {
  column.id = utilService.makeId()
  return storageService.addColumn(STORAGE_KEY, boardId, column)
}

function removeColumn(boardId, columnId) {
  return storageService.removeColumn(STORAGE_KEY, boardId, columnId)
}

function updateColumn(boardId, columnId, column) {
  return storageService.updateColumn(STORAGE_KEY, boardId, columnId, column)
}

// function addMsg(boardId, msg){
//   return httpService.post(BASE_URL + 'msg/' ,{ boardId, msg })
// }

function getEmptyGroup() {
  return {
    id: utilService.makeId(),
    title: 'New Group',
    archivedAt: Date.now(),
    tasks: [],
    style: {},
  }
}

function getEmptyBoard() {
  return {
    title: 'new board',
    archivedAt: Date.now(),
    createdBy: {
      _id: 'u101',
      fullname: 'test teston',
      imgUrl: 'http://some-img',
    },
    style: {
      backgroundImage: '',
    },
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
      {
        id: 'l102',
        title: 'Progress',
        color: '#61bd33',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'test teston',
        imgUrl: 'http://some-img',
      },
    ],
    groups: [
      {
        id: utilService.makeId(),
        title: 'Group 1',
        archivedAt: Date.now(),
        tasks: [
          {
            id: utilService.makeId(),
            title: 'item 1',
            members: [],
          },
          {
            id: utilService.makeId(),
            title: 'item 2',
            members: [],
          },
          {
            id: utilService.makeId(),
            title: 'item 3',
            members: [],
          },
        ],
        style: {},
      },
    ],
    activities: [],

    cmpsOrder: [
      { type: 'StatusPicker', id: utilService.makeId(), title: 'Status' },
      { type: 'MemberPicker', id: utilService.makeId(), title: 'Members' },
      { type: 'DatePicker', id: utilService.makeId(), title: 'Date' },
      { type: 'NumbersPicker', id: utilService.makeId(), title: 'Number' },
    ],
  }
}

// function getEmptyMsg() {
//   return { content: '', owner: {username:'Anonymous'}, createdAt: Date.now(), id: utilService.makeId()}
// }

// function getDefaultFilter() {
//   return { name: '', price: 0, labels: '', Date: '', availability: 'all' }
// }
function geColors() {
  return gColors
}

function _demoDataLocalStorage() {
  const boards = utilService.loadFromStorage(STORAGE_KEY)
  if (!boards || boards.length === 0)
    utilService.saveToStorage(STORAGE_KEY, demoData)
}
