import { Card } from 'pixel-retroui'
import { theme } from '../theme'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function HowLaunchesWork() {
  useDocumentTitle('How Launches Work - LNCH CTRL')

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-8">
      <h2 className="font-pixel text-sm mb-6 glow-green" style={{ color: theme.green }}>
        &gt; HOW LAUNCHES WORK
      </h2>

      <Card bg={theme.panel} textColor={theme.text} borderColor={theme.border} shadowColor="transparent" className="p-5 mb-6">
        <h3 className="font-pixel text-[10px] mb-3" style={{ color: theme.blue }}>
          THE COUNTDOWN: WHAT T-MINUS MEANS
        </h3>
        <p className="font-retro text-xl leading-relaxed mb-3" style={{ color: theme.text }}>
          When you see &quot;T-minus&quot; followed by a time, the T stands for &quot;Test&quot; or &quot;Time.&quot;
          It counts backward to zero, which is the moment of liftoff. Each milestone in the countdown triggers
          specific procedures.
        </p>
        <div className="font-retro text-lg flex flex-col gap-2 mt-4">
          <CountdownStep time="T-24:00:00" label="Final weather and systems review" color={theme.muted} />
          <CountdownStep time="T-06:00:00" label="Fueling begins (for some rockets)" color={theme.muted} />
          <CountdownStep time="T-01:00:00" label="Launch team conducts final polls" color={theme.yellow} />
          <CountdownStep time="T-00:10:00" label="Terminal countdown begins" color={theme.yellow} />
          <CountdownStep time="T-00:01:00" label="Onboard computers take control" color={theme.orange} />
          <CountdownStep time="T-00:00:10" label="Main engine ignition sequence" color={theme.red} />
          <CountdownStep time="T-00:00:03" label="Engines at full thrust" color={theme.red} />
          <CountdownStep time="T-00:00:00" label="LIFTOFF!" color={theme.green} />
        </div>
      </Card>

      <Card bg={theme.panel} textColor={theme.text} borderColor={theme.border} shadowColor="transparent" className="p-5 mb-6">
        <h3 className="font-pixel text-[10px] mb-3" style={{ color: theme.yellow }}>
          STAGES OF A ROCKET LAUNCH
        </h3>
        <div className="font-retro text-xl leading-relaxed flex flex-col gap-4">
          <Stage num="01" title="PRE-LAUNCH" desc="The rocket is assembled, tested, and rolled out to the launch pad. Propellant is loaded, and all systems undergo final checks. Weather conditions are evaluated to ensure safe flight." />
          <Stage num="02" title="LIFTOFF & ASCENT" desc="Engines ignite and the rocket climbs through the atmosphere. During the first few minutes, it experiences maximum aerodynamic pressure (called Max-Q). The rocket pitches over to begin its trajectory toward orbit." />
          <Stage num="03" title="STAGE SEPARATION" desc="Most rockets have multiple stages. The first stage burns out and separates, falling away (or landing for reuse on SpaceX rockets). The upper stage engine ignites to continue the journey to orbit." />
          <Stage num="04" title="ORBITAL INSERTION" desc="The upper stage performs precise burns to achieve the correct orbit. This could be Low Earth Orbit (LEO) at ~400km, Medium Earth Orbit (MEO), Geostationary Transfer Orbit (GTO), or beyond." />
          <Stage num="05" title="PAYLOAD DEPLOYMENT" desc="Satellites are released from the rocket's payload fairing, or a spacecraft separates to continue its mission. For crewed flights, the capsule enters a free-flight phase." />
        </div>
      </Card>

      <Card bg={theme.panel} textColor={theme.text} borderColor={theme.border} shadowColor="transparent" className="p-5 mb-6">
        <h3 className="font-pixel text-[10px] mb-3" style={{ color: theme.purple }}>
          TYPES OF ORBITS
        </h3>
        <div className="font-retro text-xl leading-relaxed flex flex-col gap-3">
          <OrbitType name="LEO (Low Earth Orbit)" alt="160-2,000 km" use="ISS, Earth observation, Starlink satellites" />
          <OrbitType name="MEO (Medium Earth Orbit)" alt="2,000-35,786 km" use="GPS and navigation satellites" />
          <OrbitType name="GEO (Geostationary Orbit)" alt="35,786 km" use="Communications satellites, weather monitoring" />
          <OrbitType name="SSO (Sun-Synchronous)" alt="~600-800 km" use="Earth imaging satellites that pass over areas at the same local time" />
          <OrbitType name="HEO (Highly Elliptical)" alt="Varies widely" use="Communications coverage of polar regions" />
          <OrbitType name="Escape Trajectory" alt="Beyond Earth" use="Missions to the Moon, Mars, and beyond" />
        </div>
      </Card>

      <Card bg={theme.panel} textColor={theme.text} borderColor={theme.border} shadowColor="transparent" className="p-5">
        <h3 className="font-pixel text-[10px] mb-3" style={{ color: theme.green }}>
          LAUNCH STATUS GUIDE
        </h3>
        <div className="font-retro text-xl leading-relaxed flex flex-col gap-2">
          <StatusInfo label="GO FOR LAUNCH" color={theme.blue} desc="All systems nominal, weather is clear, launch is approved to proceed." />
          <StatusInfo label="TBD (TO BE DETERMINED)" color={theme.yellow} desc="Launch date is set but not confirmed. Could change based on readiness." />
          <StatusInfo label="HOLD" color={theme.orange} desc="Countdown has been paused. Could be a technical issue, weather concern, or range safety hold." />
          <StatusInfo label="IN FLIGHT" color={theme.cyan} desc="The rocket has launched and is currently in its mission profile." />
          <StatusInfo label="SUCCESS" color={theme.green} desc="Mission objectives achieved. Payload deployed to target orbit." />
          <StatusInfo label="FAILURE" color={theme.red} desc="An anomaly occurred during the mission. Could be partial or total loss." />
        </div>
      </Card>
    </div>
  )
}

function CountdownStep({ time, label, color }) {
  return (
    <div className="flex gap-3 items-center">
      <span className="font-pixel text-[8px] min-w-[100px]" style={{ color }}>{time}</span>
      <span style={{ color: theme.text }}>{label}</span>
    </div>
  )
}

function Stage({ num, title, desc }) {
  return (
    <div>
      <div className="flex gap-2 items-center mb-1">
        <span className="font-pixel text-[9px]" style={{ color: theme.green }}>{num}</span>
        <span className="font-pixel text-[9px]" style={{ color: theme.blue }}>{title}</span>
      </div>
      <p style={{ color: theme.text }}>{desc}</p>
    </div>
  )
}

function OrbitType({ name, alt, use }) {
  return (
    <div style={{ borderLeft: `2px solid ${theme.blue}`, paddingLeft: 12 }}>
      <span className="font-pixel text-[8px]" style={{ color: theme.blue }}>{name}</span>
      <p style={{ color: theme.muted }}>Altitude: {alt}</p>
      <p style={{ color: theme.text }}>Used for: {use}</p>
    </div>
  )
}

function StatusInfo({ label, color, desc }) {
  return (
    <div className="flex gap-3 items-start">
      <span
        className="font-pixel text-[7px] px-2 py-1 shrink-0 mt-1"
        style={{ backgroundColor: color, color: theme.bg }}
      >
        {label}
      </span>
      <span style={{ color: theme.text }}>{desc}</span>
    </div>
  )
}

export default HowLaunchesWork
