import { Card } from 'pixel-retroui'
import { theme } from '../theme'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const providers = [
  {
    name: 'SpaceX',
    country: 'USA',
    founded: '2002',
    desc: 'Founded by Elon Musk, SpaceX revolutionized spaceflight with reusable rockets. Their Falcon 9 is the most frequently launched orbital rocket in the world, and the Starship system is designed for missions to Mars.',
    rockets: ['Falcon 9', 'Falcon Heavy', 'Starship'],
    color: theme.blue,
  },
  {
    name: 'NASA',
    country: 'USA',
    founded: '1958',
    desc: 'The National Aeronautics and Space Administration leads American space exploration. NASA manages the SLS rocket for the Artemis lunar program and operates the International Space Station alongside international partners.',
    rockets: ['SLS (Space Launch System)', 'Commercial partnerships'],
    color: theme.green,
  },
  {
    name: 'ESA',
    country: 'Europe',
    founded: '1975',
    desc: 'The European Space Agency is an intergovernmental organization of 22 member states. ESA launches primarily from the Guiana Space Centre in French Guiana using Ariane and Vega rockets.',
    rockets: ['Ariane 6', 'Vega-C'],
    color: theme.purple,
  },
  {
    name: 'ROSCOSMOS',
    country: 'Russia',
    founded: '1992',
    desc: 'Russia\'s space agency carries on the legacy of the Soviet space program. The Soyuz rocket family has been the most reliable launch vehicle in history, launching continuously since 1966.',
    rockets: ['Soyuz 2', 'Proton-M', 'Angara'],
    color: theme.red,
  },
  {
    name: 'ISRO',
    country: 'India',
    founded: '1969',
    desc: 'The Indian Space Research Organisation is known for cost-effective missions. ISRO successfully reached Mars orbit on its first attempt with Mangalyaan and launched the Chandrayaan lunar missions.',
    rockets: ['PSLV', 'GSLV Mk III (LVM3)'],
    color: theme.yellow,
  },
  {
    name: 'CNSA',
    country: 'China',
    founded: '1993',
    desc: 'The China National Space Administration operates China\'s civil space program. China maintains its own space station (Tiangong) and has successfully landed rovers on the Moon and Mars.',
    rockets: ['Long March 5', 'Long March 2D', 'Long March 7'],
    color: theme.orange,
  },
  {
    name: 'Rocket Lab',
    country: 'USA/NZ',
    founded: '2006',
    desc: 'Rocket Lab specializes in small satellite launches with their Electron rocket. Founded in New Zealand, they launch from both New Zealand and Virginia, and are developing the larger Neutron rocket.',
    rockets: ['Electron', 'Neutron (in development)'],
    color: theme.cyan,
  },
  {
    name: 'ULA',
    country: 'USA',
    founded: '2006',
    desc: 'United Launch Alliance is a joint venture between Boeing and Lockheed Martin. ULA provides reliable launch services for the US government and commercial customers with their Atlas and Vulcan rockets.',
    rockets: ['Vulcan Centaur', 'Atlas V (retiring)', 'Delta IV Heavy (retired)'],
    color: theme.text,
  },
]

function LaunchProviders() {
  useDocumentTitle('Launch Providers - LNCH CTRL')

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-8">
      <h2 className="font-pixel text-sm mb-6 glow-green" style={{ color: theme.green }}>
        &gt; LAUNCH PROVIDERS
      </h2>

      <p className="font-retro text-xl mb-6 leading-relaxed" style={{ color: theme.text }}>
        Space launch providers are the organizations that design, build, and operate the rockets
        that carry satellites, cargo, and crew into orbit and beyond. Here are the major players
        you will see on LNCH CTRL.
      </p>

      <div className="flex flex-col gap-4">
        {providers.map((provider) => (
          <Card
            key={provider.name}
            bg={theme.panel}
            textColor={theme.text}
            borderColor={provider.color}
            shadowColor="transparent"
            className="p-5"
          >
            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
              <h3 className="font-pixel text-[10px]" style={{ color: provider.color }}>
                {provider.name}
              </h3>
              <div className="flex gap-2">
                <span className="font-pixel text-[7px] px-2 py-0.5" style={{ border: `1px solid ${theme.muted}`, color: theme.muted }}>
                  {provider.country}
                </span>
                <span className="font-pixel text-[7px] px-2 py-0.5" style={{ border: `1px solid ${theme.muted}`, color: theme.muted }}>
                  EST. {provider.founded}
                </span>
              </div>
            </div>
            <p className="font-retro text-xl leading-relaxed mb-3" style={{ color: theme.text }}>
              {provider.desc}
            </p>
            <div className="flex gap-2 flex-wrap">
              {provider.rockets.map((rocket) => (
                <span
                  key={rocket}
                  className="font-pixel text-[7px] px-2 py-1"
                  style={{
                    backgroundColor: `${provider.color}15`,
                    color: provider.color,
                    border: `1px solid ${provider.color}`,
                  }}
                >
                  {rocket.toUpperCase()}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LaunchProviders
