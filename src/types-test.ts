/* eslint-disable max-classes-per-file */

// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

enum RelasePhase {
  'alpha' = 'Alpha',
  'beta' = 'Beta',
  'gold' = 'Gold',
}
interface NavItem {
  // ...
  label: string;
  phase?: keyof typeof RelasePhase;
}
const myItem: NavItem = {label: 'Holi Papu App', phase: 'beta'}
<span>{RelasePhase[myItem.phase]}</span>
// esto te dara
<span>Beta</span>

function getPhaseLabel ({ label, phase = 'gold' }: Partial<NavItem>) {
  return `${label}${phase !== 'gold' ? ` (${RelasePhase[phase]})` : ''}`;
}

console.log(getPhaseLabel({ label: 'User Portal', phase: 'alpha' }));
console.log(getPhaseLabel({ label: 'Call Center', phase: 'beta' }));
console.log(getPhaseLabel({ label: 'Conferences Admin', phase: 'gold' }));
console.log(getPhaseLabel({ label: 'Phone Workspace' }));

// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

enum RelasePhase {
  'alpha' = 'Alpha',
  'beta' = 'Beta',
  'gold' = 'Gold',
}
interface NavItem {
  // ...
  label: string;
  phase?: keyof typeof RelasePhase;
}

function getPhaseLabel ({
  navItem: { label, phase = 'gold' },
  t,
}: {
  navItem: Partial<NavItem>;
  t: (s: string) => string /* TFunction<unknown> */;
}) {
  return `${label}${phase !== 'gold' ? ` (${RelasePhase[phase]})` : ''}`;
}

// For t(`dock.navItems.${phase}`)
const t = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

console.log(
  getPhaseLabel({ navItem: { label: 'User Portal', phase: 'alpha' }, t })
);
console.log(
  getPhaseLabel({ navItem: { label: 'Call Center', phase: 'beta' }, t })
);
console.log(
  getPhaseLabel({ navItem: { label: 'Conferences Admin', phase: 'gold' }, t })
);
console.log(getPhaseLabel({ navItem: { label: 'Phone Workspace' }, t }));

// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

const anExampleVariable = 'Hello World';
console.log(anExampleVariable);

let t = 99;
t = 'T';
console.log(t);

// const 5t: string = '3'

const p = new Promise((resolve, reject) => {
  reject(Error('my message'));
});
p.catch((err: any) => console.log(err.message));
p.catch((err: any) => console.log(err.message));

function hello (t: string): string {
  console.log(t);
}
console.log(`Hi there!!!!!!!!!!${hello('Men')}`);

const index1 = 1;
function tTest () {
  const index2 = 2;
  if (index2 > index1) {
    let index3 = 3;
    index3++;
  }
  console.log('$$$$$$$$$$', index1, index2, typeof [1, 2, 3]);
}
tTest();

interface calcy {
  mul: (n: number) => any;
}
class display implements calcy {
  x: number = 0;
  mul (n: number): any {
    this.x = n * n;
  }

  mul (n: string): any {
    this.x = n + n;
  }
}
const arr = new display();
arr.x = 3;
arr.mul(9);

// var index = 1, count = {}
// count: {
//     begin: 2
// }
// count.begin + index;

class Queue<T> {
  private readonly data = [];
  readonly d1 = 1;
  push = (item: T) => this.data.push(item);
  pop = (): T => this.data.shift();
}
const tQ = new Queue<number>();
tQ.push(0);
tQ.push('1');
tQ.d1 = 5;
console.log('QUEUE', tQ);

console.log(Number('10') - 10 == 0, 'heyyyyyy');

const a1 = [1, 2];
a1[0] = 10;
a1[1] = 20;
a1[2] = 30;
console.log(a1);

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

namespace Vehicle {
  class Car {
    constructor (public make: string, public model: string) {}
  }

  var teslaCar = new Car('t', 's');
}

let a: any;
const x = 0;
console.log(a, typeof a === undefined, x == null);

const y = [1, 2, 4, { x: 6 }];
y[-1] = 3;
console.log(y, y[-1], y[y.indexOf(99999)], 'index', y.indexOf({ x: 6 }));

const z = { a: 1 };
Object.freeze(z);
//   z['a'] = 1
console.log(z);

//   class TPoint {
//       x: number;
//       y: number;
//   }
//   interface P3 extends TPoint {
//       z: number;
//   }

enum Weekend {
  Friday = 1,
  Saturday = getDate('T'),
  Sunday = Saturday * 40,
}
function getDate (day: string): number {
  if (day === 'T') {
    return 3;
  }
}
console.log(Weekend.Saturday);
console.log(Weekend.Sunday);

const person = {
  name: 'T',
  sayName () {
    setTimeout(() => {
      console.log(`Hey${this.name}`);
    }, 1000);
  },
};
person.sayName();

export {};
