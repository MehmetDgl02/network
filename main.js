// Network problems data
const networkProblems = [
  {
    id: 1,
    title: "Physical Connection Issues",
    layer: "Physical Layer (Layer 1)",
    layerClass: "layer-1",
    icon: "fas fa-plug",
    shortDesc: "Cable damage, signal weakness and hardware failures",
    story: "During my internship at the local municipality, I received several complaints from different departments about unstable or completely disconnected internet connections. After conducting thorough inspections, I discovered that some network cables were physically damaged — a few were crushed, some had loose or missing RJ45 connectors, and others were misrouted or improperly connected. Once I replaced the damaged cables and corrected the faulty connections, all connectivity issues were resolved. This real-life case highlighted how critical the physical layer is in maintaining network stability."
,
    problem: "Problems in the physical layer are usually caused by cable damage, connector issues, signal weakness and electrical noise. These problems can cause complete network connection loss.",
    causes: "• Damaged or loose cables\n• Faulty connectors\n• Electrical interference\n• Poor quality hardware\n• Environmental factors (humidity, temperature)",
    solution: "• Check cable integrity and replace damaged cables\n• Ensure connectors are tightly connected\n• Use signal amplifiers\n• Keep away from electrical noise sources\n• Perform regular maintenance and testing",
    symptoms: "• No network connection\n• Intermittent connection drops\n• Slow data transmission",
    
  },
  {
    id: 2,
    title: "Routing Loop and TTL Expiry",
  layer: "Network Layer (Layer 3)",
  layerClass: "layer-3",
  icon: "fas fa-sync-alt",
  shortDesc: "Misconfigured static routes cause routing loops until TTL expires",
  story: "During a major infrastructure migration at a university data center, the network team added a new backup link between two service provider routers. At first, everything seemed fine. But soon, the monitoring system showed massive ICMP 'Time Exceeded' messages and traceroutes kept repeating the same IPs in a loop. Engineer Mert started inspecting the static routes and discovered the issue: the same route was defined on multiple routers, but each one pointed to the next as the next-hop, forming a perfect loop. Because no dynamic routing protocols or loop prevention existed, the TTL of each packet slowly counted down until it hit zero and was dropped. This incident became a textbook case of why loop prevention and proper path selection are critical at Layer 3.",
  problem: "A routing loop occurs when a packet is continuously forwarded between routers in a loop due to misconfigured routes, causing network congestion and eventual TTL expiry.",
  causes: "• Misconfigured static routes\n• Lack of loop prevention mechanisms\n• No use of dynamic routing protocols\n• Improper next-hop IP definitions\n• Circular routing logic",
 solution: "•  Use correct static route configurations:    R1(config)# ip route 10.10.50.0 255.255.255.0 203.0.113.1      R2(config)# no ip route 10.10.50.0 255.255.255.0 10.10.20.1\n•  Implement dynamic routing protocols with built-in loop prevention:  R1(config)   # router ospf 1    R1(config-router)# network 10.10.0.0 0.0.255.255 area 0     R2(config)# router ospf 1    R2(config-router)# network 10.10.0.0 0.0.255.255 area 0 \n•  Configure administrative distance for backup routes:    R1(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1       R1(config)# ip route 0.0.0.0 0.0.0.0 10.10.20.2 5  \n•  TTL (Time To Live) automatically limits packet lifespan and drops looping packets:_No configuration needed, but traceroute can help diagnose:_> traceroute 10.10.50.1\n• Avoid circular next-hop references:# Incorrect - creates a loop:R1(config)# ip route 10.10.50.0 255.255.255.0 10.10.20.2      R2(config)# ip route 10.10.50.0 255.255.255.0 10.10.20.1       # Correct:R1(config)# ip route 10.10.50.0 255.255.255.0 203.0.113.1",
  symptoms: "• ICMP 'Time Exceeded' messages\n• TTL decreasing on repeated traceroute hops\n• High CPU usage on routers\n• Network slowdown or packet loss\n• Duplicate route entries or loops seen in routing tables",
  
    images: [
      "images/root-loop.png",
      "images/root-loop2.png",
    ],
    packetFiles: [
      { name: "root loop example", path: "packet_tracer/root-loop.pkt" }
    ]
  },
  {
    id: 3,
    title: "IP Conflict Problems",
    layer: "Network Layer (Layer 3)",
    layerClass: "layer-3",
    icon: "fas fa-route",
    shortDesc: "Incorrect routing table and subnet problems",
    story: "During my internship at the municipality, I was responsible for managing the computer systems. I noticed that some devices were experiencing problems connecting to the internet. Upon investigation, I discovered that due to an error made by the IT department, an IP address that had been assigned to another computer was also given to this device. The issue was resolved when I obtained a new IP address from the IT department and reconfigured the affected device. It was like having two offices with the same room number - visitors didn't know which door to knock on!",
    problem: "Two or more devices on the same network are assigned the same static IP address, leading to communication issues. Devices might fail to send or receive packets, especially during routing, ARP resolution, or ICMP testing (ping).",
    solution: "• Identify IP conflicts using tools like 'arp -a' and 'ipconfig'\n• Assign unique IP addresses to each device (either statically or via DHCP)\n• Review the DHCP server's address pool and lease time settings\n• If using static IPs, ensure they do not overlap with others\n• Clear ARP cache if necessary (e.g., using 'arp -d' command)\n• Verify that no cloned or imaged devices are using the same IP/MAC\n• Check NAT and routing table settings to ensure proper packet forwarding",
    causes: "• Faulty DHCP server assigns overlapping IPs (misconfigured address pool or lease settings).\n Manual misconfiguration: Admin assigns the same static IP to multiple devices.•\n• Device cloned or restored with old IP settings.\n• ARP cache conflicts or MAC address spoofing (in rare security-related cases).",
    symptoms: "•  Failed ping replies\n• Network instability \n•  Duplicate IP warning",
    images: [
      "images/ip-routing1.PNG"
    ],
    packetFiles: [
      { name: "IP Conflict Example", path: "packet_tracer/ip-routing1.pkt" }
    ]
  },
  {
    "id": 4,
  title: "Network Redundancy Failure",
  layer: "Network Layer (Layer 3) & Data Link Layer (Layer 2)",
  layerClas: "layer-3",
  icon: "fas fa-exchange-alt",
  shortDesc: "Single point of failure due to lack of redundant devices or paths",
  story: "At a small regional office of a logistics company, the entire network suddenly went offline during a busy Monday morning. Elif, the network technician, rushed to investigate. She quickly realized that the only router connecting the office to the internet had failed. There was no secondary route, no backup router, no redundancy at all. Because the router was a single point of failure, the entire branch lost internet access. Later that week, Elif proposed and implemented a redundant network design with an additional router, backup links, and proper routing failover configuration. The next time a device went down, operations continued smoothly – a clear win for redundancy!",
  problem: "Critical network devices like routers and switches are not redundant. If one device or link fails, it causes a complete outage for all connected systems, especially in topologies with a single point of failure.",
  solutio: "• Implement network redundancy by adding extra routers, switches, and alternative paths\n• Use Layer 3 failover mechanisms such as floating static routes or routing protocols like OSPF/HSRP\n• Configure multiple default gateways and test failover paths\n• Connect devices using redundant physical links where possible\n• For enterprise networks, apply redundancy at both the core/distribution and WAN levels\n• Use NIC teaming or bonding on servers for link redundancy\n• Regularly test failover scenarios",
  causes: "• Network design lacks redundancy due to cost or oversight\n• Only one router or switch is used in a critical path\n• No failover configuration on Layer 3 devices\n• Physical link failure with no alternate route\n• Incorrect or missing static backup routes",
  symptoms: "• Complete network outage when a core device fails\n• Loss of internet access for all users\n• No failover or route switch-over\n• Ping to default gateway or external IP fails until manual intervention",
  images: [
    "images/hsr.png",
    "images/hsr2.png",
    "images/hsr-unsolved.png"
  ],
  packetFiles: [
    { name: "Redundancy Example", path: "packet_tracer/network-redudancy.pkt" },
    { name: "Redundancy Unsolved Example", path: "packet_tracer/hsr-unsolved-version.pkt" }
  ]
  },
  {
    id: 5,
    title: "Session Timeout Problems",
    layer: "Session Layer (Layer 5)",
    layerClass: "layer-5",
    icon: "fas fa-clock",
    shortDesc: "Session management and timeout configuration issues affecting user experience and security",
    story: "I was the lead systems administrator for a regional bank's online platform when we started receiving an avalanche of customer complaints. Users were being logged out mid-transaction while filling out loan applications, sometimes losing 30-45 minutes of work. Our security team had mandated a 5-minute session timeout after a minor security audit, but nobody considered the user impact. Meanwhile, our mobile banking app had the opposite problem - sessions never expired due to a configuration error, leaving accounts accessible on shared devices for hours. The breaking point came when a customer's grandmother lost her retirement account application for the third time and called to close all her accounts. That's when management finally understood that security without usability isn't security at all - it's just frustration that drives customers away. We had to completely redesign our session management strategy, implementing intelligent timeout policies that balanced security with real-world usage patterns. Now we use sliding timeouts that extend based on user activity, secure session tokens that auto-refresh, and device-specific policies that keep mobile sessions longer while tightening desktop timeouts.",
    problem: "Inadequate session timeout configuration causing either premature session termination disrupting user workflows or overly long sessions creating security vulnerabilities on shared or compromised devices.",
    causes: "• Misconfigured session timeout values (too short or too long)\n• Static timeout policies not considering user activity patterns\n• Load balancer session persistence misconfigurations\n• Inactive session detection failures\n• Cookie expiration and server-side session mismatch\n• Missing session refresh mechanisms during active use\n• Poor session management across multiple application tiers",
    solution: "• Implement intelligent sliding timeout windows based on user activity\n• Configure keep-alive mechanisms for active sessions\n• Set up proper load balancer session affinity and persistence\n• Deploy session monitoring and alerting systems\n• Implement graceful session warnings before timeout\n• Configure device-specific timeout policies\n• Set up secure session token refresh mechanisms\n• Implement session data backup for form recovery",
    symptoms: "• Users frequently logged out during active tasks\n• Loss of form data and transaction progress\n• Authentication required repeatedly in short timeframes\n• Inconsistent session behavior across different pages\n• Session persistence issues in load-balanced environments\n• Security concerns from sessions remaining active too long\n• User complaints about poor application experience",

},
  {
    id: 6,
    title: "SSL/TLS Certificate Problems",
    layer: "Presentation Layer (Layer 6)",
    layerClass: "layer-6",
    icon: "fas fa-certificate",
    shortDesc: "Encryption and certificate validation issues",
    story: "I was excited to launch my first e-commerce website that I had been developing for months. After uploading everything to my web server and configuring the domain, I eagerly opened my browser to see my creation live. Instead of my beautiful homepage, I was greeted with a terrifying red warning: 'Your connection is not private' and 'This site may be compromised.' My heart sank. I had forgotten to properly configure the SSL certificate. The browser was showing NET::ERR_CERT_AUTHORITY_INVALID because I was using a self-signed certificate. I quickly realized that customers would never trust a site with security warnings. I had to learn about Certificate Authorities, purchase a proper SSL certificate, and configure it correctly on my server. After fixing the certificate chain and ensuring proper validation, my site finally showed the comforting green padlock icon that builds customer confidence.",
    problem: "Expired certificates, self-signed certificates, cipher suite incompatibilities and TLS version problems.",
    causes: "• Expired or invalid SSL/TLS certificates\n• Self-signed certificates not trusted by browsers\n• Incompatible cipher suites between client and server\n• Deprecated TLS versions (1.0, 1.1)\n• Broken certificate chain\n• Domain name mismatch in certificate",
    solution: "• Purchase and install valid certificates from trusted CAs\n• Renew certificates before expiration\n• Configure proper certificate chain\n• Update cipher suite configuration\n• Enforce modern TLS versions (1.2+)\n• Verify certificate domain matching\n• Implement certificate monitoring",
    symptoms: "• SSL handshake errors in browser console\n• Browser security warnings (red padlock)\n• Encrypted connection failures\n• NET::ERR_CERT_AUTHORITY_INVALID errors\n• Mixed content warnings",
    images: [
      "images/tls.png",
      "images/tls1.png",
      
      
    ],
    packetFiles: [
      { name: "ssl/tls example", path: "packet_tracer/https.pkt" }
    ]
},
  {
    id: 7,
  title: "DNS Resolution Problems",
  layer: "Application Layer (Layer 7)",
  layerClass: "layer-7",
  icon: "fas fa-globe",
  shortDesc: "Domain name resolution and DNS server issues",
  story: "TechStartup.com had just launched their revolutionary app with a massive marketing campaign. Billboards, TV ads, and social media were all driving traffic to their website. But users typing 'techstartup.com' were greeted with 'Server not found' errors. The DNS admin had forgotten to remove a test entry that pointed to a non-existent server. For 6 hours, millions in advertising dollars drove traffic to nowhere. Even after fixing it, DNS propagation took another 24 hours, during which some users could access the site while others couldn't - creating a support nightmare.",
  problem: "DNS servers being unreachable, incorrect DNS records, DNS cache problems and domain name resolution errors.",
  causes: "• Incorrect or unreachable DNS server configuration\n• DNS server is offline\n• Invalid or missing DNS records (e.g., A record)\n• Incorrect entries in the hosts file\n• DNS cache corruption",
  solution: "• Use 'nslookup' to verify DNS resolution and server\n• Check and correct DNS server IP in client settings\n• Clear DNS cache using 'ipconfig /flushdns'\n• Use reliable public DNS (e.g., 8.8.8.8 - Google DNS)\n• Edit or remove incorrect entries in hosts file\n• Verify DNS records on DNS server",
  symptoms: "• Website names not resolving (e.g., ping www.ornek.com fails)\n• 'Server not found' or timeout errors\n• DNS resolution works on some devices but not others",
    images: [
      "images/dns-resolution.png",
      
      
    ],
    packetFiles: [
      { name: "DNS Example", path: "packet_tracer/dnsConfiguration.pkt" }
    ]
  },
  {
 id: 8,
 title: "Unauthorized Network Access",
 layer: "Session Layer (Layer 5) ",
 layerClass: "layer-5",
 icon: "fas fa-user-shield",
 shortDesc: "Unauthorized users gaining network access and security breaches",
 story: "At GlobalTech's Istanbul office one morning, the IT team noticed unusual traffic spikes. When they checked security cameras, they saw a cleaning staff member plugging an ethernet cable into an empty desk and connecting his personal laptop. This person had gained access to servers containing sensitive customer data and had been copying files for 3 days. Since port security wasn't enabled, the system gave no warnings. When the incident was discovered, the company lost customer trust and faced hefty data breach penalties.",
 problem: "Unauthorized access to network resources, security policy violations, and misuse of network infrastructure.",
 causes: "• Lack of port security configuration\n• Weak authentication systems\n• MAC address spoofing attacks\n• Rogue access points\n• VLAN hopping attacks\n• Physical security gaps",
 solution: "• Enable port security: 'switchport port-security'\n• Configure 802.1X authentication\n• Implement VLAN segmentation\n• Define Access Control Lists (ACL)\n• Enable DHCP snooping\n• Regularly monitor MAC address table\n• Track security violations with monitoring",
 symptoms: "• Unknown MAC addresses appearing on network\n• Unusual traffic increases\n• Unauthorized devices obtaining DHCP IPs\n• Port security violation logs\n• Unexpected network performance degradation",

},
  {
    id: 9,
      title: "NAT (Network Address Translation) Misconfiguration",
  layer: "Transport Layer (Layer 4)",
  layerClass: "layer-4",
  icon: "fas fa-random",
  shortDesc: "Incorrect NAT rules block client-server communication.",
  story: "It was a critical moment at a software development firm as they prepared to deploy a new web application. Internal testers kept reporting connection failures when accessing the test server from the office network. The network engineer quickly realized that although the router was translating addresses, one key NAT rule had been misconfigured. The external users could not reach the internal HTTP server due to incorrect inside/outside interface assignments. A simple configuration oversight nearly derailed the deployment.",
  problem: "Static NAT configuration issues causing HTTP services to be unreachable from external networks.",
  causes: "• NAT inside/outside interfaces incorrectly assigned\n• Missing or incorrect static NAT rule\n• Access list conflicts with NAT\n• Misrouted default gateway or static route missing",
  solution: "• Properly configure NAT using correct inside and outside interfaces\n• Define static NAT or PAT rules for services like HTTP\n• Check the NAT translation table using 'show ip nat translations'\n• Confirm default routes and interface statuses\n• Avoid ACL conflicts by testing incrementally",
  symptoms: "• Web server unreachable externally\n• 'Request timed out' during ping\n• No NAT translation entries appearing\n• HTTP access fails while internal IPs work",
    images: [
      "images/nat2.png",
      "images/nat3.png"
    ],
    packetFiles: [
      { name: "Nat Problem", path: "packet_tracer/Nat.pkt" }
    ]
  },
  { id: 10,
        title: "Broadcast Storm",
    layer: "Data Link Layer (Layer 2)",
    layerClass: "layer-2",
    icon: "fas fa-exclamation-triangle",
    shortDesc: "Excessive broadcast traffic overwhelming network infrastructure",
    story: "During my first week as a network administrator at a growing tech startup, I decided to add redundancy to our network by connecting our main switches with multiple Ethernet cables - thinking more connections meant better reliability. Within seconds of plugging in the second cable, our entire office network came to a crawling halt. Employees couldn't access emails, our cloud services became unreachable, and even simple file transfers timed out. The switch status LEDs were blinking frantically like Christmas lights gone mad. I watched in horror as our network monitoring dashboard showed broadcast traffic spiking to 100% utilization. The switches were caught in an endless loop, forwarding the same broadcast frames over and over through both cable paths. Each switch received a broadcast frame on one link and dutifully forwarded it out all other ports, including the redundant link, creating an exponentially growing storm of traffic. I quickly learned that redundancy without proper Spanning Tree Protocol configuration creates chaos, not reliability. After disconnecting one cable and enabling STP, the network returned to normal, but the lesson was permanently etched in my memory.",
    problem: "Network performance degradation and complete device unresponsiveness due to exponentially multiplying broadcast traffic flooding the network infrastructure.",
    causes: "• Layer 2 loops in network topology without STP\n• Multiple physical connections between switches\n• Misconfigured or disabled Spanning Tree Protocol\n• Faulty network interface cards generating excessive broadcasts\n• Too many devices in single broadcast domain\n• VLAN misconfigurations creating broadcast loops",
    solution: "• Enable and properly configure Spanning Tree Protocol (STP/RSTP)\n• Implement VLAN segmentation to reduce broadcast domains\n• Configure broadcast storm control on switch ports\n• Apply rate limiting for broadcast traffic\n• Use proper network design with controlled redundancy\n• Monitor broadcast traffic levels regularly\n• Configure port security and loop detection",
    symptoms: "• Network becomes extremely slow or completely unresponsive\n• High CPU utilization on network devices and connected hosts\n• Switch port utilization showing 100% continuously\n• Network timeouts and application failures\n• Excessive blinking activity LEDs on switches\n• ARP table flooding and MAC address table instability",
    images: [
      "images/broadcast1.png",
      "images/broadcast.png"
    ],
    packetFiles: [
      { name: "Broadcast Storm Example", path: "packet_tracer/broadcast.pkt" },
      { name: "Broadcast Storm Unsolved Example", path: "packet_tracer/broadcast.pkt" }
    ]
  }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  renderProblemCards();
  setupModalHandlers();
  setupScrollAnimations();
});

// Render problem cards
function renderProblemCards() {
  const container = document.getElementById('problems-container');
  
  networkProblems.forEach((problem, index) => {
    const card = createProblemCard(problem, index);
    container.appendChild(card);
  });
}

// Create individual problem card
function createProblemCard(problem, index) {
  const col = document.createElement('div');
  col.className = 'col-lg-4 col-md-6 fade-in';
  col.style.animationDelay = `${index * 0.1}s`;
  
  col.innerHTML = `
    <div class="card problem-card ${problem.layerClass}" onclick="showProblemDetail(${problem.id})">
      <div class="card-header">
        <div class="layer-icon-wrapper">
          <i class="${problem.icon} layer-icon"></i>
        </div>
        <h5 class="card-title">${problem.title}</h5>
        <span class="layer-badge">${problem.layer}</span>
      </div>
      <div class="card-body">
        <p class="card-text">${problem.shortDesc}</p>
        <div class="card-footer-custom">
          <small class="layer-number">Problem #${problem.id}</small>
          <button class="btn btn-detail btn-sm">
            View Details <i class="fas fa-arrow-right ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  
  return col;
}

// Show problem detail in modal
function showProblemDetail(problemId) {
  const problem = networkProblems.find(p => p.id === problemId);
  if (!problem) return;

  const modalTitle = document.getElementById('problemModalLabel');
  const modalContent = document.getElementById('modal-content');

  // Story section HTML
  let storyHtml = '';
  if (problem.story) {
    storyHtml = `
      <div class="story-section mb-4">
        <h6><i class="fas fa-book-open text-primary me-2"></i>Real-World Story</h6>
        <div class="story-content">
          <p class="text-muted fst-italic">${problem.story}</p>
        </div>
      </div>
    `;
  }

  // Carousel HTML (only if images exist)
  let carouselHtml = '';
  if (problem.images && problem.images.length > 0) {
    const carouselId = `carousel-${problem.id}`;
    carouselHtml = `
      <div class="mt-4 mb-4">
        <h6><i class="fas fa-images text-primary me-2"></i>Related Images</h6>
        <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${problem.images.map((img, idx) => `
              <div class="carousel-item${idx === 0 ? ' active' : ''}">
                <img src="${img}" class="d-block w-100 rounded" alt="Problem Image ${idx + 1}" style="max-height: 500px; object-fit: contain; background-color: #f8f9fa;">
              </div>
            `).join('')}
          </div>
          ${problem.images.length > 1 ? `
            <button class="carousel-control-prev custom-carousel-btn" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next custom-carousel-btn" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
            <div class="carousel-indicators">
              ${problem.images.map((_, idx) => `
                <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${idx}" ${idx === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${idx + 1}"></button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // Download section (only if packetFile exists)
let downloadHtml = '';
if (problem.packetFiles && Array.isArray(problem.packetFiles) && problem.packetFiles.length > 0) {
  downloadHtml = `
    <div class="mt-4">
      <h6><i class="fas fa-download text-secondary me-2"></i>Download Cisco Packet Tracer Files</h6>
      <div class="d-flex flex-wrap gap-2">
        ${problem.packetFiles.map(file => `
          <a href="${file.path}" download class="btn btn-outline-secondary btn-sm">
            <i class="fas fa-file-download me-1"></i>${file.name || 'Download .pkt File'}
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

// ...modalContent.innerHTML = ... kısmında...
modalContent.innerHTML = `
  <div class="row">
    <div class="col-12 mb-3">
      <span class="problem-badge">${problem.layer}</span>
    </div>
  </div>
  
  ${storyHtml}
  
  <div class="problem-section">
    <!-- ...problem details... -->
  </div>
  
  <div class="solution-section">
    <!-- ...solution details... -->
  </div>

  ${carouselHtml}
  ${downloadHtml}
`;

  modalTitle.innerHTML = `
    <i class="${problem.icon} me-2"></i>
    ${problem.title}
  `;

  modalContent.innerHTML = `
    <div class="row">
      <div class="col-12 mb-3">
        <span class="problem-badge">${problem.layer}</span>
      </div>
    </div>
    
    ${storyHtml}
    
    <div class="problem-section">
      <h6><i class="fas fa-exclamation-circle text-warning me-2"></i>Problem Description</h6>
      <p>${problem.problem}</p>
      
      <h6><i class="fas fa-bug text-danger me-2"></i>Causes</h6>
      <div class="causes">
        ${(problem.causes || '').split('\n').map(cause => `<div>${cause.replace('• ', '🔹 ')}</div>`).join('')}
      </div>
      
      <h6><i class="fas fa-stethoscope text-info me-2"></i>Symptoms</h6>
      <div class="symptoms">
        ${(problem.symptoms || '').split('\n').map(symptom => `<div>${symptom.replace('• ', '🔸 ')}</div>`).join('')}
      </div>
    </div>
    
    <div class="solution-section">
      <h6><i class="fas fa-tools text-success me-2"></i>Solution Recommendations</h6>
      <div class="solutions">
        ${(problem.solution || '').split('\n').map(solution => `<div class="mb-2">✅ ${solution.replace('• ', '')}</div>`).join('')}
      </div>
    </div>

    ${carouselHtml}
    ${downloadHtml}
  `;

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('problemModal'));
  modal.show();
}

// Setup modal event handlers
function setupModalHandlers() {
  const modal = document.getElementById('problemModal');
  
  modal.addEventListener('show.bs.modal', function () {
    document.body.style.overflow = 'hidden';
  });
  
  modal.addEventListener('hidden.bs.modal', function () {
    document.body.style.overflow = 'auto';
  });
}

// Setup scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// Global function for onclick handlers
window.showProblemDetail = showProblemDetail;

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Enhanced loading animation
window.addEventListener('load', function() {
  // Trigger animations after a short delay
  setTimeout(() => {
    const cards = document.querySelectorAll('.fade-in');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 150);
    });
  }, 300);
});

// Add parallax effect to floating shapes
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const speed = 0.5 + (index * 0.1);
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add mouse move effect for hero section
document.addEventListener('mousemove', function(e) {
  const hero = document.querySelector('.hero-header');
  if (!hero) return;
  
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const deltaX = (x - centerX) / centerX;
  const deltaY = (y - centerY) / centerY;
  
  const heroIcon = document.querySelector('.hero-icon-wrapper');
  if (heroIcon) {
    heroIcon.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
  }
});