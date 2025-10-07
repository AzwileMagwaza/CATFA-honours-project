import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, FileText, Scale, Users } from "lucide-react"

export default function EthicsPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Badge variant="secondary" className="mb-2">
          Research Ethics
        </Badge>
        <h1 className="text-4xl font-bold">Ethical & Legal Compliance</h1>
        <p className="text-muted-foreground text-lg">
          Responsible OSINT practices and data protection in cultural heritage research
        </p>
      </div>

      {/* Overview */}
      <Card className="border-accent/50 bg-accent/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-accent" />
            <div>
              <CardTitle className="text-2xl">Commitment to Ethical Research</CardTitle>
              <CardDescription className="text-base">
                CATFA adheres to international standards for responsible intelligence gathering
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">
            The Cultural Art Trafficking Forensic Analysis project is conducted in full compliance with South African
            data protection legislation (POPIA), international OSINT ethics guidelines, and academic research standards.
            All investigative activities prioritize privacy, transparency, and responsible disclosure.
          </p>
        </CardContent>
      </Card>

      {/* Key Principles */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-accent" />
              <CardTitle>POPIA Compliance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              The Protection of Personal Information Act (POPIA) governs data processing in South Africa. CATFA ensures:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Collection limited to publicly available information</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Purpose specification for research and heritage protection</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Data minimization and retention policies</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Security safeguards for stored information</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-accent" />
              <CardTitle>Responsible OSINT Usage</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Open-source intelligence gathering follows established ethical frameworks:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>No unauthorized access to private systems or data</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Respect for platform terms of service</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Avoidance of social engineering or deceptive practices</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Proportionality in data collection methods</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-accent" />
              <CardTitle>Data Anonymization</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Personal information is protected through systematic anonymization:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Pseudonymization of seller identities in reports</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Removal of direct identifiers from published datasets</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Aggregation of data for statistical analysis</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Secure storage with access controls</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-accent" />
              <CardTitle>Methodological Transparency</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Research integrity requires clear documentation of methods:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Detailed methodology disclosure in publications</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Reproducible data collection procedures</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Clear statement of limitations and biases</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Peer review and academic oversight</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Legal Framework */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Legal and Regulatory Framework</CardTitle>
          <CardDescription>Applicable legislation and international standards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">South African Legislation</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Protection of Personal Information Act (POPIA), 2013</li>
              <li>• National Heritage Resources Act (NHRA), 1999</li>
              <li>• Electronic Communications and Transactions Act (ECTA), 2002</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">International Standards</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• UNESCO Convention on Cultural Property (1970)</li>
              <li>• UNIDROIT Convention on Stolen or Illegally Exported Cultural Objects (1995)</li>
              <li>• GDPR principles for data protection (where applicable)</li>
              <li>• OSINT Framework ethical guidelines</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Stakeholder Considerations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-accent" />
            <div>
              <CardTitle className="text-2xl">Stakeholder Considerations</CardTitle>
              <CardDescription>Balancing research objectives with individual rights</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            CATFA recognizes the diverse interests of stakeholders in cultural heritage protection:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Heritage Communities</h4>
              <p className="text-sm text-muted-foreground">
                Respecting cultural sensitivities and indigenous knowledge systems while investigating artifact
                trafficking.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Law Enforcement</h4>
              <p className="text-sm text-muted-foreground">
                Providing actionable intelligence while maintaining evidentiary standards and legal admissibility.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Platform Operators</h4>
              <p className="text-sm text-muted-foreground">
                Collaborating with marketplace administrators to combat illicit trade without compromising legitimate
                commerce.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Academic Community</h4>
              <p className="text-sm text-muted-foreground">
                Contributing to scholarly discourse on digital forensics and heritage protection through rigorous
                research.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsible Disclosure */}
      <Card className="border-accent/50">
        <CardHeader>
          <CardTitle className="text-2xl">Responsible Disclosure Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            When CATFA identifies potential criminal activity or platform vulnerabilities:
          </p>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Findings are reported to appropriate law enforcement agencies</li>
            <li>Platform operators are notified of systemic issues through proper channels</li>
            <li>Public disclosure is delayed until authorities have opportunity to investigate</li>
            <li>Academic publications avoid details that could facilitate further trafficking</li>
            <li>Victim communities are consulted regarding sensitive cultural information</li>
          </ol>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            For questions regarding research ethics or data protection practices, please contact the project supervisor
            or institutional ethics committee.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
