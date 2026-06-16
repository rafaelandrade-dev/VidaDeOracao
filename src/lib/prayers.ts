export type Prayer = {
  slug: string
  title: string
  description: string
  icon: string
  text: string
}

export const prayers: Prayer[] = [
  {
    slug: 'pai-nosso',
    title: 'Pai Nosso',
    description: 'A oração que Jesus nos ensinou',
    icon: '👐',
    text: `Pai nosso que estais no céu,
santificado seja o vosso nome,
venha a nós o vosso reino,
seja feita a vossa vontade,
assim na terra como no céu.
O pão nosso de cada dia nos dai hoje,
perdoai as nossas ofensas,
assim como nós perdoamos
a quem nos tem ofendido,
e não nos deixeis cair em tentação,
mas livrai-nos do mal.
Amém.`,
  },
  {
    slug: 'ave-maria',
    title: 'Ave Maria',
    description: 'Saudação à Virgem Maria',
    icon: '🌹',
    text: `Ave Maria, cheia de graça,
o Senhor é convosco,
bendita sois vós entre as mulheres,
e bendito é o fruto do vosso ventre, Jesus.
Santa Maria, Mãe de Deus,
rogai por nós pecadores,
agora e na hora da nossa morte.
Amém.`,
  },
  {
    slug: 'gloria',
    title: 'Glória',
    description: 'Doxologia menor',
    icon: '✨',
    text: `Glória ao Pai e ao Filho e ao Espírito Santo.
Como era no princípio, agora e sempre,
por todos os séculos dos séculos.
Amém.`,
  },
  {
    slug: 'credo',
    title: 'Credo Apostólico',
    description: 'Profissão de fé da Igreja',
    icon: '📜',
    text: `Creio em Deus Pai todo-poderoso,
Criador do céu e da terra;
e em Jesus Cristo, seu único Filho, Nosso Senhor;
que foi concebido pelo poder do Espírito Santo;
nasceu da Virgem Maria;
padeceu sob Pôncio Pilatos,
foi crucificado, morto e sepultado;
desceu à mansão dos mortos;
ressuscitou ao terceiro dia;
subiu aos céus,
está sentado à direita de Deus Pai todo-poderoso,
donde há de vir a julgar os vivos e os mortos.
Creio no Espírito Santo,
na santa Igreja Católica,
na comunhão dos santos,
na remissão dos pecados,
na ressurreição da carne,
na vida eterna.
Amém.`,
  },
  {
    slug: 'ato-de-contricao',
    title: 'Ato de Contrição',
    description: 'Oração de arrependimento',
    icon: '🕊️',
    text: `Meu Deus,
porque sois infinitamente bom e digno de ser amado
sobre todas as coisas,
pesa-me muito ter pecado contra vós
e proponho firmemente, com o auxílio da vossa graça,
não vos ofender mais e fugir das ocasiões de pecado.
Amém.`,
  },
  {
    slug: 'salve-rainha',
    title: 'Salve Rainha',
    description: 'Antífona mariana',
    icon: '👑',
    text: `Salve, Rainha, Mãe de misericórdia,
vida, doçura e esperança nossa, salve!
A vós bradamos, os degredados filhos de Eva;
a vós suspiramos, gemendo e chorando
neste vale de lágrimas.
Eia, pois, advogada nossa,
esses vossos olhos misericordiosos a nós volvei;
e depois deste desterro, mostrai-nos Jesus,
bendito fruto do vosso ventre.
Ó clemente, ó piedosa, ó doce sempre-Virgem Maria!
Amém.`,
  },
  {
    slug: 'angelus',
    title: 'Ângelus',
    description: 'Oração do meio-dia e do anoitecer',
    icon: '🔔',
    text: `O Anjo do Senhor anunciou a Maria.
E ela concebeu pelo Espírito Santo.
Ave Maria, cheia de graça...

Eis a serva do Senhor.
Seja feita em mim a vossa palavra.
Ave Maria, cheia de graça...

E o Verbo se fez carne.
E habitou entre nós.
Ave Maria, cheia de graça...

Rogai por nós, santa Mãe de Deus,
para que sejamos dignos das promessas de Cristo.

Oremos: Derramai, Senhor, a vossa graça em nossas almas,
para que, tendo conhecido pelo anúncio do Anjo
a Encarnação de Cristo, vosso Filho,
cheguemos pela sua Paixão e Cruz
à glória da Ressurreição.
Por Cristo, Nosso Senhor.
Amém.`,
  },
]

export function getPrayerBySlug(slug: string): Prayer | undefined {
  return prayers.find((p) => p.slug === slug)
}
