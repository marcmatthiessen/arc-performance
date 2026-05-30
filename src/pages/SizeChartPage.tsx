import { useState } from 'react'
import PageLayout from '../components/PageLayout'

type Gender = 'men' | 'women'
type Category = 'racesuits' | 'jerseys' | 'bibs' | 'running' | 'training'

const MEN_RACESUITS = [
  { size: 'XS',  height: '165–170', weight: '55–65',  chest: '86–90',   waist: '72–76', hip: '86–90'   },
  { size: 'S',   height: '170–175', weight: '65–75',  chest: '90–94',   waist: '76–80', hip: '90–94'   },
  { size: 'M',   height: '175–180', weight: '75–85',  chest: '94–98',   waist: '80–84', hip: '94–98'   },
  { size: 'L',   height: '180–185', weight: '85–95',  chest: '98–102',  waist: '84–88', hip: '98–102'  },
  { size: 'XL',  height: '185–190', weight: '95–105', chest: '102–106', waist: '88–92', hip: '102–106' },
  { size: 'XXL', height: '190+',    weight: '105+',   chest: '106–110', waist: '92–96', hip: '106–110' },
]

const WOMEN_RACESUITS = [
  { size: 'XS',  height: '155–160', weight: '45–52', chest: '80–84',   waist: '62–66', hip: '86–90'   },
  { size: 'S',   height: '160–165', weight: '52–60', chest: '84–88',   waist: '66–70', hip: '90–94'   },
  { size: 'M',   height: '165–170', weight: '60–68', chest: '88–92',   waist: '70–74', hip: '94–98'   },
  { size: 'L',   height: '170–175', weight: '68–76', chest: '92–96',   waist: '74–78', hip: '98–102'  },
  { size: 'XL',  height: '175–180', weight: '76–84', chest: '96–100',  waist: '78–82', hip: '102–106' },
  { size: 'XXL', height: '180+',    weight: '84+',   chest: '100–104', waist: '82–86', hip: '106–110' },
]

const MEN_JERSEYS = [
  { size: 'XS',  height: '165–170', weight: '55–65',  chest: '88–92',   waist: '74–78', hip: '88–92'   },
  { size: 'S',   height: '170–175', weight: '65–75',  chest: '92–96',   waist: '78–82', hip: '92–96'   },
  { size: 'M',   height: '175–180', weight: '75–85',  chest: '96–100',  waist: '82–86', hip: '96–100'  },
  { size: 'L',   height: '180–185', weight: '85–95',  chest: '100–104', waist: '86–90', hip: '100–104' },
  { size: 'XL',  height: '185–190', weight: '95–105', chest: '104–108', waist: '90–94', hip: '104–108' },
  { size: 'XXL', height: '190+',    weight: '105+',   chest: '108–112', waist: '94–98', hip: '108–112' },
]

const WOMEN_JERSEYS = [
  { size: 'XS',  height: '155–160', weight: '45–52', chest: '82–86',   waist: '64–68', hip: '88–92'   },
  { size: 'S',   height: '160–165', weight: '52–60', chest: '86–90',   waist: '68–72', hip: '92–96'   },
  { size: 'M',   height: '165–170', weight: '60–68', chest: '90–94',   waist: '72–76', hip: '96–100'  },
  { size: 'L',   height: '170–175', weight: '68–76', chest: '94–98',   waist: '76–80', hip: '100–104' },
  { size: 'XL',  height: '175–180', weight: '76–84', chest: '98–102',  waist: '80–84', hip: '104–108' },
  { size: 'XXL', height: '180+',    weight: '84+',   chest: '102–106', waist: '84–88', hip: '108–112' },
]

const COLS = ['Size', 'Height (cm)', 'Weight (kg)', 'Chest (cm)', 'Waist (cm)', 'Hip (cm)']

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'racesuits', label: 'Racesuits' },
  { key: 'jerseys',   label: 'Jerseys' },
  { key: 'bibs',      label: 'Bibs' },
  { key: 'running',   label: 'Running' },
  { key: 'training',  label: 'Training' },
]

function getData(gender: Gender, category: Category) {
  if (category === 'racesuits') return gender === 'men' ? MEN_RACESUITS : WOMEN_RACESUITS
  return gender === 'men' ? MEN_JERSEYS : WOMEN_JERSEYS
}

function getTip(category: Category) {
  if (category === 'racesuits') return (
    <>
      <strong style={{ color: 'var(--text)' }}>Between two sizes?</strong>{' '}
      For racesuits we recommend sizing <strong style={{ color: 'var(--text)' }}>down</strong> for greater compression and aerodynamic performance.
    </>
  )
  if (category === 'bibs') return (
    <>
      <strong style={{ color: 'var(--text)' }}>Between two sizes?</strong>{' '}
      For bibs, choose the size that matches your waist measurement. A correct fit ensures optimal pad placement.
    </>
  )
  if (category === 'running') return (
    <>
      <strong style={{ color: 'var(--text)' }}>Between two sizes?</strong>{' '}
      For running gear we recommend sizing <strong style={{ color: 'var(--text)' }}>up</strong> for unrestricted movement and ventilation.
    </>
  )
  return (
    <>
      <strong style={{ color: 'var(--text)' }}>Between two sizes?</strong>{' '}
      For jerseys and training wear, choose <strong style={{ color: 'var(--text)' }}>larger</strong> for comfort on long sessions.
    </>
  )
}

const tdStyle: React.CSSProperties = {
  fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px',
  color: 'var(--text)', padding: '16px 20px',
}

export default function SizeChartPage() {
  const [gender, setGender] = useState<Gender>('men')
  const [category, setCategory] = useState<Category>('racesuits')
  const data = getData(gender, category)

  return (
    <PageLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px 120px' }}>

        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: '#C8FF00', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px' }}>
            SIZE GUIDE
          </p>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(48px, 7vw, 88px)', color: 'var(--text)', lineHeight: 0.9, letterSpacing: '-1px', marginBottom: '40px' }}>
            SIZE CHART
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'inline-flex', background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '3px' }}>
              {(['men', 'women'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} style={{
                  fontFamily: 'Barlow, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '2px',
                  textTransform: 'uppercase', padding: '10px 28px', border: 'none', cursor: 'pointer',
                  background: gender === g ? '#C8FF00' : 'transparent',
                  color: gender === g ? '#000' : 'var(--muted)', transition: 'all 0.2s',
                }}>
                  {g === 'men' ? 'Men' : 'Women'}
                </button>
              ))}
            </div>

            <div style={{ display: 'inline-flex', background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '3px', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button key={cat.key} onClick={() => setCategory(cat.key)} style={{
                  fontFamily: 'Barlow, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '2px',
                  textTransform: 'uppercase', padding: '10px 22px', border: 'none', cursor: 'pointer',
                  background: category === cat.key ? '#C8FF00' : 'transparent',
                  color: category === cat.key ? '#000' : 'var(--muted)', transition: 'all 0.2s',
                }}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--stroke)' }}>
                {COLS.map(c => (
                  <th key={c} style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', fontWeight: 600, color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', padding: '14px 20px', textAlign: 'left', whiteSpace: 'nowrap' }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={row.size} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--stroke)' }}>
                  <td style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '18px', color: '#C8FF00', padding: '16px 20px' }}>{row.size}</td>
                  <td style={tdStyle}>{row.height}</td>
                  <td style={tdStyle}>{row.weight}</td>
                  <td style={tdStyle}>{row.chest}</td>
                  <td style={tdStyle}>{row.waist}</td>
                  <td style={tdStyle}>{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', borderLeft: '3px solid #C8FF00', padding: '24px 28px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8 }}>
            {getTip(category)}
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
