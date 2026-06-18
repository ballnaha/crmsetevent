
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Organizer
 * 
 */
export type Organizer = $Result.DefaultSelection<Prisma.$OrganizerPayload>
/**
 * Model ContactActivity
 * 
 */
export type ContactActivity = $Result.DefaultSelection<Prisma.$ContactActivityPayload>
/**
 * Model Venue
 * 
 */
export type Venue = $Result.DefaultSelection<Prisma.$VenuePayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model EmailTemplate
 * 
 */
export type EmailTemplate = $Result.DefaultSelection<Prisma.$EmailTemplatePayload>
/**
 * Model EmailCampaign
 * 
 */
export type EmailCampaign = $Result.DefaultSelection<Prisma.$EmailCampaignPayload>
/**
 * Model EmailRecipient
 * 
 */
export type EmailRecipient = $Result.DefaultSelection<Prisma.$EmailRecipientPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EventSource: {
  BITEC: 'BITEC',
  IMPACT: 'IMPACT',
  MANUAL: 'MANUAL'
};

export type EventSource = (typeof EventSource)[keyof typeof EventSource]


export const LeadStatus: {
  NEW: 'NEW',
  QUALIFIED: 'QUALIFIED',
  CONTACTED: 'CONTACTED',
  PROPOSAL: 'PROPOSAL',
  WON: 'WON',
  LOST: 'LOST'
};

export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus]


export const LeadPriority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export type LeadPriority = (typeof LeadPriority)[keyof typeof LeadPriority]

}

export type EventSource = $Enums.EventSource

export const EventSource: typeof $Enums.EventSource

export type LeadStatus = $Enums.LeadStatus

export const LeadStatus: typeof $Enums.LeadStatus

export type LeadPriority = $Enums.LeadPriority

export const LeadPriority: typeof $Enums.LeadPriority

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Organizers
 * const organizers = await prisma.organizer.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Organizers
   * const organizers = await prisma.organizer.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.organizer`: Exposes CRUD operations for the **Organizer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizers
    * const organizers = await prisma.organizer.findMany()
    * ```
    */
  get organizer(): Prisma.OrganizerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contactActivity`: Exposes CRUD operations for the **ContactActivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactActivities
    * const contactActivities = await prisma.contactActivity.findMany()
    * ```
    */
  get contactActivity(): Prisma.ContactActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.venue`: Exposes CRUD operations for the **Venue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Venues
    * const venues = await prisma.venue.findMany()
    * ```
    */
  get venue(): Prisma.VenueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailTemplate`: Exposes CRUD operations for the **EmailTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailTemplates
    * const emailTemplates = await prisma.emailTemplate.findMany()
    * ```
    */
  get emailTemplate(): Prisma.EmailTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailCampaign`: Exposes CRUD operations for the **EmailCampaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailCampaigns
    * const emailCampaigns = await prisma.emailCampaign.findMany()
    * ```
    */
  get emailCampaign(): Prisma.EmailCampaignDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailRecipient`: Exposes CRUD operations for the **EmailRecipient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailRecipients
    * const emailRecipients = await prisma.emailRecipient.findMany()
    * ```
    */
  get emailRecipient(): Prisma.EmailRecipientDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Organizer: 'Organizer',
    ContactActivity: 'ContactActivity',
    Venue: 'Venue',
    Event: 'Event',
    Lead: 'Lead',
    Activity: 'Activity',
    EmailTemplate: 'EmailTemplate',
    EmailCampaign: 'EmailCampaign',
    EmailRecipient: 'EmailRecipient'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "organizer" | "contactActivity" | "venue" | "event" | "lead" | "activity" | "emailTemplate" | "emailCampaign" | "emailRecipient"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organizer: {
        payload: Prisma.$OrganizerPayload<ExtArgs>
        fields: Prisma.OrganizerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          findFirst: {
            args: Prisma.OrganizerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          findMany: {
            args: Prisma.OrganizerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>[]
          }
          create: {
            args: Prisma.OrganizerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          createMany: {
            args: Prisma.OrganizerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrganizerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          update: {
            args: Prisma.OrganizerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          deleteMany: {
            args: Prisma.OrganizerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizerPayload>
          }
          aggregate: {
            args: Prisma.OrganizerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizer>
          }
          groupBy: {
            args: Prisma.OrganizerGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizerGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizerCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizerCountAggregateOutputType> | number
          }
        }
      }
      ContactActivity: {
        payload: Prisma.$ContactActivityPayload<ExtArgs>
        fields: Prisma.ContactActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactActivityPayload>
          }
          findFirst: {
            args: Prisma.ContactActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactActivityPayload>
          }
          findMany: {
            args: Prisma.ContactActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactActivityPayload>[]
          }
          create: {
            args: Prisma.ContactActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactActivityPayload>
          }
          createMany: {
            args: Prisma.ContactActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ContactActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactActivityPayload>
          }
          update: {
            args: Prisma.ContactActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactActivityPayload>
          }
          deleteMany: {
            args: Prisma.ContactActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContactActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactActivityPayload>
          }
          aggregate: {
            args: Prisma.ContactActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactActivity>
          }
          groupBy: {
            args: Prisma.ContactActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ContactActivityCountAggregateOutputType> | number
          }
        }
      }
      Venue: {
        payload: Prisma.$VenuePayload<ExtArgs>
        fields: Prisma.VenueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VenueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VenueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          findFirst: {
            args: Prisma.VenueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VenueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          findMany: {
            args: Prisma.VenueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          create: {
            args: Prisma.VenueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          createMany: {
            args: Prisma.VenueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VenueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          update: {
            args: Prisma.VenueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          deleteMany: {
            args: Prisma.VenueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VenueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VenueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          aggregate: {
            args: Prisma.VenueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVenue>
          }
          groupBy: {
            args: Prisma.VenueGroupByArgs<ExtArgs>
            result: $Utils.Optional<VenueGroupByOutputType>[]
          }
          count: {
            args: Prisma.VenueCountArgs<ExtArgs>
            result: $Utils.Optional<VenueCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      EmailTemplate: {
        payload: Prisma.$EmailTemplatePayload<ExtArgs>
        fields: Prisma.EmailTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          findFirst: {
            args: Prisma.EmailTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          findMany: {
            args: Prisma.EmailTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>[]
          }
          create: {
            args: Prisma.EmailTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          createMany: {
            args: Prisma.EmailTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmailTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          update: {
            args: Prisma.EmailTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          deleteMany: {
            args: Prisma.EmailTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmailTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailTemplatePayload>
          }
          aggregate: {
            args: Prisma.EmailTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailTemplate>
          }
          groupBy: {
            args: Prisma.EmailTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<EmailTemplateCountAggregateOutputType> | number
          }
        }
      }
      EmailCampaign: {
        payload: Prisma.$EmailCampaignPayload<ExtArgs>
        fields: Prisma.EmailCampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailCampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailCampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailCampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailCampaignPayload>
          }
          findFirst: {
            args: Prisma.EmailCampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailCampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailCampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailCampaignPayload>
          }
          findMany: {
            args: Prisma.EmailCampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailCampaignPayload>[]
          }
          create: {
            args: Prisma.EmailCampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailCampaignPayload>
          }
          createMany: {
            args: Prisma.EmailCampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmailCampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailCampaignPayload>
          }
          update: {
            args: Prisma.EmailCampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailCampaignPayload>
          }
          deleteMany: {
            args: Prisma.EmailCampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailCampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmailCampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailCampaignPayload>
          }
          aggregate: {
            args: Prisma.EmailCampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailCampaign>
          }
          groupBy: {
            args: Prisma.EmailCampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailCampaignGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailCampaignCountArgs<ExtArgs>
            result: $Utils.Optional<EmailCampaignCountAggregateOutputType> | number
          }
        }
      }
      EmailRecipient: {
        payload: Prisma.$EmailRecipientPayload<ExtArgs>
        fields: Prisma.EmailRecipientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailRecipientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailRecipientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailRecipientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailRecipientPayload>
          }
          findFirst: {
            args: Prisma.EmailRecipientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailRecipientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailRecipientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailRecipientPayload>
          }
          findMany: {
            args: Prisma.EmailRecipientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailRecipientPayload>[]
          }
          create: {
            args: Prisma.EmailRecipientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailRecipientPayload>
          }
          createMany: {
            args: Prisma.EmailRecipientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmailRecipientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailRecipientPayload>
          }
          update: {
            args: Prisma.EmailRecipientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailRecipientPayload>
          }
          deleteMany: {
            args: Prisma.EmailRecipientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailRecipientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmailRecipientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailRecipientPayload>
          }
          aggregate: {
            args: Prisma.EmailRecipientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailRecipient>
          }
          groupBy: {
            args: Prisma.EmailRecipientGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailRecipientGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailRecipientCountArgs<ExtArgs>
            result: $Utils.Optional<EmailRecipientCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    organizer?: OrganizerOmit
    contactActivity?: ContactActivityOmit
    venue?: VenueOmit
    event?: EventOmit
    lead?: LeadOmit
    activity?: ActivityOmit
    emailTemplate?: EmailTemplateOmit
    emailCampaign?: EmailCampaignOmit
    emailRecipient?: EmailRecipientOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizerCountOutputType
   */

  export type OrganizerCountOutputType = {
    events: number
    activities: number
  }

  export type OrganizerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | OrganizerCountOutputTypeCountEventsArgs
    activities?: boolean | OrganizerCountOutputTypeCountActivitiesArgs
  }

  // Custom InputTypes
  /**
   * OrganizerCountOutputType without action
   */
  export type OrganizerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizerCountOutputType
     */
    select?: OrganizerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizerCountOutputType without action
   */
  export type OrganizerCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * OrganizerCountOutputType without action
   */
  export type OrganizerCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactActivityWhereInput
  }


  /**
   * Count Type VenueCountOutputType
   */

  export type VenueCountOutputType = {
    events: number
  }

  export type VenueCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | VenueCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * VenueCountOutputType without action
   */
  export type VenueCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueCountOutputType
     */
    select?: VenueCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VenueCountOutputType without action
   */
  export type VenueCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    leads: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | EventCountOutputTypeCountLeadsArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }


  /**
   * Count Type LeadCountOutputType
   */

  export type LeadCountOutputType = {
    activities: number
  }

  export type LeadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | LeadCountOutputTypeCountActivitiesArgs
  }

  // Custom InputTypes
  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCountOutputType
     */
    select?: LeadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }


  /**
   * Count Type EmailTemplateCountOutputType
   */

  export type EmailTemplateCountOutputType = {
    campaigns: number
  }

  export type EmailTemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaigns?: boolean | EmailTemplateCountOutputTypeCountCampaignsArgs
  }

  // Custom InputTypes
  /**
   * EmailTemplateCountOutputType without action
   */
  export type EmailTemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplateCountOutputType
     */
    select?: EmailTemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmailTemplateCountOutputType without action
   */
  export type EmailTemplateCountOutputTypeCountCampaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailCampaignWhereInput
  }


  /**
   * Count Type EmailCampaignCountOutputType
   */

  export type EmailCampaignCountOutputType = {
    recipients: number
  }

  export type EmailCampaignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipients?: boolean | EmailCampaignCountOutputTypeCountRecipientsArgs
  }

  // Custom InputTypes
  /**
   * EmailCampaignCountOutputType without action
   */
  export type EmailCampaignCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaignCountOutputType
     */
    select?: EmailCampaignCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmailCampaignCountOutputType without action
   */
  export type EmailCampaignCountOutputTypeCountRecipientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailRecipientWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organizer
   */

  export type AggregateOrganizer = {
    _count: OrganizerCountAggregateOutputType | null
    _avg: OrganizerAvgAggregateOutputType | null
    _sum: OrganizerSumAggregateOutputType | null
    _min: OrganizerMinAggregateOutputType | null
    _max: OrganizerMaxAggregateOutputType | null
  }

  export type OrganizerAvgAggregateOutputType = {
    id: number | null
  }

  export type OrganizerSumAggregateOutputType = {
    id: number | null
  }

  export type OrganizerMinAggregateOutputType = {
    id: number | null
    companyName: string | null
    contactName: string | null
    phone: string | null
    email: string | null
    website: string | null
    facebook: string | null
    note: string | null
    outreachStatus: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizerMaxAggregateOutputType = {
    id: number | null
    companyName: string | null
    contactName: string | null
    phone: string | null
    email: string | null
    website: string | null
    facebook: string | null
    note: string | null
    outreachStatus: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizerCountAggregateOutputType = {
    id: number
    companyName: number
    contactName: number
    phone: number
    email: number
    website: number
    facebook: number
    note: number
    outreachStatus: number
    lockedFields: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizerAvgAggregateInputType = {
    id?: true
  }

  export type OrganizerSumAggregateInputType = {
    id?: true
  }

  export type OrganizerMinAggregateInputType = {
    id?: true
    companyName?: true
    contactName?: true
    phone?: true
    email?: true
    website?: true
    facebook?: true
    note?: true
    outreachStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizerMaxAggregateInputType = {
    id?: true
    companyName?: true
    contactName?: true
    phone?: true
    email?: true
    website?: true
    facebook?: true
    note?: true
    outreachStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizerCountAggregateInputType = {
    id?: true
    companyName?: true
    contactName?: true
    phone?: true
    email?: true
    website?: true
    facebook?: true
    note?: true
    outreachStatus?: true
    lockedFields?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizer to aggregate.
     */
    where?: OrganizerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizers to fetch.
     */
    orderBy?: OrganizerOrderByWithRelationInput | OrganizerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizers
    **/
    _count?: true | OrganizerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrganizerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrganizerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizerMaxAggregateInputType
  }

  export type GetOrganizerAggregateType<T extends OrganizerAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizer[P]>
      : GetScalarType<T[P], AggregateOrganizer[P]>
  }




  export type OrganizerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizerWhereInput
    orderBy?: OrganizerOrderByWithAggregationInput | OrganizerOrderByWithAggregationInput[]
    by: OrganizerScalarFieldEnum[] | OrganizerScalarFieldEnum
    having?: OrganizerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizerCountAggregateInputType | true
    _avg?: OrganizerAvgAggregateInputType
    _sum?: OrganizerSumAggregateInputType
    _min?: OrganizerMinAggregateInputType
    _max?: OrganizerMaxAggregateInputType
  }

  export type OrganizerGroupByOutputType = {
    id: number
    companyName: string
    contactName: string | null
    phone: string | null
    email: string | null
    website: string | null
    facebook: string | null
    note: string | null
    outreachStatus: string
    lockedFields: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: OrganizerCountAggregateOutputType | null
    _avg: OrganizerAvgAggregateOutputType | null
    _sum: OrganizerSumAggregateOutputType | null
    _min: OrganizerMinAggregateOutputType | null
    _max: OrganizerMaxAggregateOutputType | null
  }

  type GetOrganizerGroupByPayload<T extends OrganizerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizerGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizerGroupByOutputType[P]>
        }
      >
    >


  export type OrganizerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    contactName?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    facebook?: boolean
    note?: boolean
    outreachStatus?: boolean
    lockedFields?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    events?: boolean | Organizer$eventsArgs<ExtArgs>
    activities?: boolean | Organizer$activitiesArgs<ExtArgs>
    _count?: boolean | OrganizerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizer"]>



  export type OrganizerSelectScalar = {
    id?: boolean
    companyName?: boolean
    contactName?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    facebook?: boolean
    note?: boolean
    outreachStatus?: boolean
    lockedFields?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyName" | "contactName" | "phone" | "email" | "website" | "facebook" | "note" | "outreachStatus" | "lockedFields" | "createdAt" | "updatedAt", ExtArgs["result"]["organizer"]>
  export type OrganizerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | Organizer$eventsArgs<ExtArgs>
    activities?: boolean | Organizer$activitiesArgs<ExtArgs>
    _count?: boolean | OrganizerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrganizerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organizer"
    objects: {
      events: Prisma.$EventPayload<ExtArgs>[]
      activities: Prisma.$ContactActivityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyName: string
      contactName: string | null
      phone: string | null
      email: string | null
      website: string | null
      facebook: string | null
      note: string | null
      outreachStatus: string
      lockedFields: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["organizer"]>
    composites: {}
  }

  type OrganizerGetPayload<S extends boolean | null | undefined | OrganizerDefaultArgs> = $Result.GetResult<Prisma.$OrganizerPayload, S>

  type OrganizerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizerCountAggregateInputType | true
    }

  export interface OrganizerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organizer'], meta: { name: 'Organizer' } }
    /**
     * Find zero or one Organizer that matches the filter.
     * @param {OrganizerFindUniqueArgs} args - Arguments to find a Organizer
     * @example
     * // Get one Organizer
     * const organizer = await prisma.organizer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizerFindUniqueArgs>(args: SelectSubset<T, OrganizerFindUniqueArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organizer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizerFindUniqueOrThrowArgs} args - Arguments to find a Organizer
     * @example
     * // Get one Organizer
     * const organizer = await prisma.organizer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizerFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organizer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerFindFirstArgs} args - Arguments to find a Organizer
     * @example
     * // Get one Organizer
     * const organizer = await prisma.organizer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizerFindFirstArgs>(args?: SelectSubset<T, OrganizerFindFirstArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organizer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerFindFirstOrThrowArgs} args - Arguments to find a Organizer
     * @example
     * // Get one Organizer
     * const organizer = await prisma.organizer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizerFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizerFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizers
     * const organizers = await prisma.organizer.findMany()
     * 
     * // Get first 10 Organizers
     * const organizers = await prisma.organizer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizerWithIdOnly = await prisma.organizer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizerFindManyArgs>(args?: SelectSubset<T, OrganizerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organizer.
     * @param {OrganizerCreateArgs} args - Arguments to create a Organizer.
     * @example
     * // Create one Organizer
     * const Organizer = await prisma.organizer.create({
     *   data: {
     *     // ... data to create a Organizer
     *   }
     * })
     * 
     */
    create<T extends OrganizerCreateArgs>(args: SelectSubset<T, OrganizerCreateArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizers.
     * @param {OrganizerCreateManyArgs} args - Arguments to create many Organizers.
     * @example
     * // Create many Organizers
     * const organizer = await prisma.organizer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizerCreateManyArgs>(args?: SelectSubset<T, OrganizerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Organizer.
     * @param {OrganizerDeleteArgs} args - Arguments to delete one Organizer.
     * @example
     * // Delete one Organizer
     * const Organizer = await prisma.organizer.delete({
     *   where: {
     *     // ... filter to delete one Organizer
     *   }
     * })
     * 
     */
    delete<T extends OrganizerDeleteArgs>(args: SelectSubset<T, OrganizerDeleteArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organizer.
     * @param {OrganizerUpdateArgs} args - Arguments to update one Organizer.
     * @example
     * // Update one Organizer
     * const organizer = await prisma.organizer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizerUpdateArgs>(args: SelectSubset<T, OrganizerUpdateArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizers.
     * @param {OrganizerDeleteManyArgs} args - Arguments to filter Organizers to delete.
     * @example
     * // Delete a few Organizers
     * const { count } = await prisma.organizer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizerDeleteManyArgs>(args?: SelectSubset<T, OrganizerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizers
     * const organizer = await prisma.organizer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizerUpdateManyArgs>(args: SelectSubset<T, OrganizerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Organizer.
     * @param {OrganizerUpsertArgs} args - Arguments to update or create a Organizer.
     * @example
     * // Update or create a Organizer
     * const organizer = await prisma.organizer.upsert({
     *   create: {
     *     // ... data to create a Organizer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organizer we want to update
     *   }
     * })
     */
    upsert<T extends OrganizerUpsertArgs>(args: SelectSubset<T, OrganizerUpsertArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerCountArgs} args - Arguments to filter Organizers to count.
     * @example
     * // Count the number of Organizers
     * const count = await prisma.organizer.count({
     *   where: {
     *     // ... the filter for the Organizers we want to count
     *   }
     * })
    **/
    count<T extends OrganizerCountArgs>(
      args?: Subset<T, OrganizerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organizer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizerAggregateArgs>(args: Subset<T, OrganizerAggregateArgs>): Prisma.PrismaPromise<GetOrganizerAggregateType<T>>

    /**
     * Group by Organizer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizerGroupByArgs['orderBy'] }
        : { orderBy?: OrganizerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organizer model
   */
  readonly fields: OrganizerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organizer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends Organizer$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Organizer$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activities<T extends Organizer$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Organizer$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organizer model
   */
  interface OrganizerFieldRefs {
    readonly id: FieldRef<"Organizer", 'Int'>
    readonly companyName: FieldRef<"Organizer", 'String'>
    readonly contactName: FieldRef<"Organizer", 'String'>
    readonly phone: FieldRef<"Organizer", 'String'>
    readonly email: FieldRef<"Organizer", 'String'>
    readonly website: FieldRef<"Organizer", 'String'>
    readonly facebook: FieldRef<"Organizer", 'String'>
    readonly note: FieldRef<"Organizer", 'String'>
    readonly outreachStatus: FieldRef<"Organizer", 'String'>
    readonly lockedFields: FieldRef<"Organizer", 'Json'>
    readonly createdAt: FieldRef<"Organizer", 'DateTime'>
    readonly updatedAt: FieldRef<"Organizer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organizer findUnique
   */
  export type OrganizerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter, which Organizer to fetch.
     */
    where: OrganizerWhereUniqueInput
  }

  /**
   * Organizer findUniqueOrThrow
   */
  export type OrganizerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter, which Organizer to fetch.
     */
    where: OrganizerWhereUniqueInput
  }

  /**
   * Organizer findFirst
   */
  export type OrganizerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter, which Organizer to fetch.
     */
    where?: OrganizerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizers to fetch.
     */
    orderBy?: OrganizerOrderByWithRelationInput | OrganizerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizers.
     */
    cursor?: OrganizerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizers.
     */
    distinct?: OrganizerScalarFieldEnum | OrganizerScalarFieldEnum[]
  }

  /**
   * Organizer findFirstOrThrow
   */
  export type OrganizerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter, which Organizer to fetch.
     */
    where?: OrganizerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizers to fetch.
     */
    orderBy?: OrganizerOrderByWithRelationInput | OrganizerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizers.
     */
    cursor?: OrganizerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizers.
     */
    distinct?: OrganizerScalarFieldEnum | OrganizerScalarFieldEnum[]
  }

  /**
   * Organizer findMany
   */
  export type OrganizerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter, which Organizers to fetch.
     */
    where?: OrganizerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizers to fetch.
     */
    orderBy?: OrganizerOrderByWithRelationInput | OrganizerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizers.
     */
    cursor?: OrganizerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizers.
     */
    distinct?: OrganizerScalarFieldEnum | OrganizerScalarFieldEnum[]
  }

  /**
   * Organizer create
   */
  export type OrganizerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * The data needed to create a Organizer.
     */
    data: XOR<OrganizerCreateInput, OrganizerUncheckedCreateInput>
  }

  /**
   * Organizer createMany
   */
  export type OrganizerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizers.
     */
    data: OrganizerCreateManyInput | OrganizerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organizer update
   */
  export type OrganizerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * The data needed to update a Organizer.
     */
    data: XOR<OrganizerUpdateInput, OrganizerUncheckedUpdateInput>
    /**
     * Choose, which Organizer to update.
     */
    where: OrganizerWhereUniqueInput
  }

  /**
   * Organizer updateMany
   */
  export type OrganizerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizers.
     */
    data: XOR<OrganizerUpdateManyMutationInput, OrganizerUncheckedUpdateManyInput>
    /**
     * Filter which Organizers to update
     */
    where?: OrganizerWhereInput
    /**
     * Limit how many Organizers to update.
     */
    limit?: number
  }

  /**
   * Organizer upsert
   */
  export type OrganizerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * The filter to search for the Organizer to update in case it exists.
     */
    where: OrganizerWhereUniqueInput
    /**
     * In case the Organizer found by the `where` argument doesn't exist, create a new Organizer with this data.
     */
    create: XOR<OrganizerCreateInput, OrganizerUncheckedCreateInput>
    /**
     * In case the Organizer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizerUpdateInput, OrganizerUncheckedUpdateInput>
  }

  /**
   * Organizer delete
   */
  export type OrganizerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    /**
     * Filter which Organizer to delete.
     */
    where: OrganizerWhereUniqueInput
  }

  /**
   * Organizer deleteMany
   */
  export type OrganizerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizers to delete
     */
    where?: OrganizerWhereInput
    /**
     * Limit how many Organizers to delete.
     */
    limit?: number
  }

  /**
   * Organizer.events
   */
  export type Organizer$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Organizer.activities
   */
  export type Organizer$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactActivity
     */
    select?: ContactActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactActivity
     */
    omit?: ContactActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactActivityInclude<ExtArgs> | null
    where?: ContactActivityWhereInput
    orderBy?: ContactActivityOrderByWithRelationInput | ContactActivityOrderByWithRelationInput[]
    cursor?: ContactActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactActivityScalarFieldEnum | ContactActivityScalarFieldEnum[]
  }

  /**
   * Organizer without action
   */
  export type OrganizerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
  }


  /**
   * Model ContactActivity
   */

  export type AggregateContactActivity = {
    _count: ContactActivityCountAggregateOutputType | null
    _avg: ContactActivityAvgAggregateOutputType | null
    _sum: ContactActivitySumAggregateOutputType | null
    _min: ContactActivityMinAggregateOutputType | null
    _max: ContactActivityMaxAggregateOutputType | null
  }

  export type ContactActivityAvgAggregateOutputType = {
    id: number | null
    organizerId: number | null
  }

  export type ContactActivitySumAggregateOutputType = {
    id: number | null
    organizerId: number | null
  }

  export type ContactActivityMinAggregateOutputType = {
    id: number | null
    organizerId: number | null
    type: string | null
    text: string | null
    createdAt: Date | null
  }

  export type ContactActivityMaxAggregateOutputType = {
    id: number | null
    organizerId: number | null
    type: string | null
    text: string | null
    createdAt: Date | null
  }

  export type ContactActivityCountAggregateOutputType = {
    id: number
    organizerId: number
    type: number
    text: number
    createdAt: number
    _all: number
  }


  export type ContactActivityAvgAggregateInputType = {
    id?: true
    organizerId?: true
  }

  export type ContactActivitySumAggregateInputType = {
    id?: true
    organizerId?: true
  }

  export type ContactActivityMinAggregateInputType = {
    id?: true
    organizerId?: true
    type?: true
    text?: true
    createdAt?: true
  }

  export type ContactActivityMaxAggregateInputType = {
    id?: true
    organizerId?: true
    type?: true
    text?: true
    createdAt?: true
  }

  export type ContactActivityCountAggregateInputType = {
    id?: true
    organizerId?: true
    type?: true
    text?: true
    createdAt?: true
    _all?: true
  }

  export type ContactActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactActivity to aggregate.
     */
    where?: ContactActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactActivities to fetch.
     */
    orderBy?: ContactActivityOrderByWithRelationInput | ContactActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactActivities
    **/
    _count?: true | ContactActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactActivityMaxAggregateInputType
  }

  export type GetContactActivityAggregateType<T extends ContactActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateContactActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactActivity[P]>
      : GetScalarType<T[P], AggregateContactActivity[P]>
  }




  export type ContactActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactActivityWhereInput
    orderBy?: ContactActivityOrderByWithAggregationInput | ContactActivityOrderByWithAggregationInput[]
    by: ContactActivityScalarFieldEnum[] | ContactActivityScalarFieldEnum
    having?: ContactActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactActivityCountAggregateInputType | true
    _avg?: ContactActivityAvgAggregateInputType
    _sum?: ContactActivitySumAggregateInputType
    _min?: ContactActivityMinAggregateInputType
    _max?: ContactActivityMaxAggregateInputType
  }

  export type ContactActivityGroupByOutputType = {
    id: number
    organizerId: number
    type: string
    text: string
    createdAt: Date
    _count: ContactActivityCountAggregateOutputType | null
    _avg: ContactActivityAvgAggregateOutputType | null
    _sum: ContactActivitySumAggregateOutputType | null
    _min: ContactActivityMinAggregateOutputType | null
    _max: ContactActivityMaxAggregateOutputType | null
  }

  type GetContactActivityGroupByPayload<T extends ContactActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ContactActivityGroupByOutputType[P]>
        }
      >
    >


  export type ContactActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizerId?: boolean
    type?: boolean
    text?: boolean
    createdAt?: boolean
    organizer?: boolean | OrganizerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contactActivity"]>



  export type ContactActivitySelectScalar = {
    id?: boolean
    organizerId?: boolean
    type?: boolean
    text?: boolean
    createdAt?: boolean
  }

  export type ContactActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizerId" | "type" | "text" | "createdAt", ExtArgs["result"]["contactActivity"]>
  export type ContactActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizer?: boolean | OrganizerDefaultArgs<ExtArgs>
  }

  export type $ContactActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactActivity"
    objects: {
      organizer: Prisma.$OrganizerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      organizerId: number
      type: string
      text: string
      createdAt: Date
    }, ExtArgs["result"]["contactActivity"]>
    composites: {}
  }

  type ContactActivityGetPayload<S extends boolean | null | undefined | ContactActivityDefaultArgs> = $Result.GetResult<Prisma.$ContactActivityPayload, S>

  type ContactActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactActivityCountAggregateInputType | true
    }

  export interface ContactActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactActivity'], meta: { name: 'ContactActivity' } }
    /**
     * Find zero or one ContactActivity that matches the filter.
     * @param {ContactActivityFindUniqueArgs} args - Arguments to find a ContactActivity
     * @example
     * // Get one ContactActivity
     * const contactActivity = await prisma.contactActivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactActivityFindUniqueArgs>(args: SelectSubset<T, ContactActivityFindUniqueArgs<ExtArgs>>): Prisma__ContactActivityClient<$Result.GetResult<Prisma.$ContactActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContactActivity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactActivityFindUniqueOrThrowArgs} args - Arguments to find a ContactActivity
     * @example
     * // Get one ContactActivity
     * const contactActivity = await prisma.contactActivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactActivityClient<$Result.GetResult<Prisma.$ContactActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactActivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactActivityFindFirstArgs} args - Arguments to find a ContactActivity
     * @example
     * // Get one ContactActivity
     * const contactActivity = await prisma.contactActivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactActivityFindFirstArgs>(args?: SelectSubset<T, ContactActivityFindFirstArgs<ExtArgs>>): Prisma__ContactActivityClient<$Result.GetResult<Prisma.$ContactActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactActivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactActivityFindFirstOrThrowArgs} args - Arguments to find a ContactActivity
     * @example
     * // Get one ContactActivity
     * const contactActivity = await prisma.contactActivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactActivityClient<$Result.GetResult<Prisma.$ContactActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContactActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactActivities
     * const contactActivities = await prisma.contactActivity.findMany()
     * 
     * // Get first 10 ContactActivities
     * const contactActivities = await prisma.contactActivity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactActivityWithIdOnly = await prisma.contactActivity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactActivityFindManyArgs>(args?: SelectSubset<T, ContactActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContactActivity.
     * @param {ContactActivityCreateArgs} args - Arguments to create a ContactActivity.
     * @example
     * // Create one ContactActivity
     * const ContactActivity = await prisma.contactActivity.create({
     *   data: {
     *     // ... data to create a ContactActivity
     *   }
     * })
     * 
     */
    create<T extends ContactActivityCreateArgs>(args: SelectSubset<T, ContactActivityCreateArgs<ExtArgs>>): Prisma__ContactActivityClient<$Result.GetResult<Prisma.$ContactActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContactActivities.
     * @param {ContactActivityCreateManyArgs} args - Arguments to create many ContactActivities.
     * @example
     * // Create many ContactActivities
     * const contactActivity = await prisma.contactActivity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactActivityCreateManyArgs>(args?: SelectSubset<T, ContactActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ContactActivity.
     * @param {ContactActivityDeleteArgs} args - Arguments to delete one ContactActivity.
     * @example
     * // Delete one ContactActivity
     * const ContactActivity = await prisma.contactActivity.delete({
     *   where: {
     *     // ... filter to delete one ContactActivity
     *   }
     * })
     * 
     */
    delete<T extends ContactActivityDeleteArgs>(args: SelectSubset<T, ContactActivityDeleteArgs<ExtArgs>>): Prisma__ContactActivityClient<$Result.GetResult<Prisma.$ContactActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContactActivity.
     * @param {ContactActivityUpdateArgs} args - Arguments to update one ContactActivity.
     * @example
     * // Update one ContactActivity
     * const contactActivity = await prisma.contactActivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactActivityUpdateArgs>(args: SelectSubset<T, ContactActivityUpdateArgs<ExtArgs>>): Prisma__ContactActivityClient<$Result.GetResult<Prisma.$ContactActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContactActivities.
     * @param {ContactActivityDeleteManyArgs} args - Arguments to filter ContactActivities to delete.
     * @example
     * // Delete a few ContactActivities
     * const { count } = await prisma.contactActivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactActivityDeleteManyArgs>(args?: SelectSubset<T, ContactActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactActivities
     * const contactActivity = await prisma.contactActivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactActivityUpdateManyArgs>(args: SelectSubset<T, ContactActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContactActivity.
     * @param {ContactActivityUpsertArgs} args - Arguments to update or create a ContactActivity.
     * @example
     * // Update or create a ContactActivity
     * const contactActivity = await prisma.contactActivity.upsert({
     *   create: {
     *     // ... data to create a ContactActivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactActivity we want to update
     *   }
     * })
     */
    upsert<T extends ContactActivityUpsertArgs>(args: SelectSubset<T, ContactActivityUpsertArgs<ExtArgs>>): Prisma__ContactActivityClient<$Result.GetResult<Prisma.$ContactActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContactActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactActivityCountArgs} args - Arguments to filter ContactActivities to count.
     * @example
     * // Count the number of ContactActivities
     * const count = await prisma.contactActivity.count({
     *   where: {
     *     // ... the filter for the ContactActivities we want to count
     *   }
     * })
    **/
    count<T extends ContactActivityCountArgs>(
      args?: Subset<T, ContactActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactActivityAggregateArgs>(args: Subset<T, ContactActivityAggregateArgs>): Prisma.PrismaPromise<GetContactActivityAggregateType<T>>

    /**
     * Group by ContactActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactActivityGroupByArgs['orderBy'] }
        : { orderBy?: ContactActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactActivity model
   */
  readonly fields: ContactActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactActivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizer<T extends OrganizerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizerDefaultArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContactActivity model
   */
  interface ContactActivityFieldRefs {
    readonly id: FieldRef<"ContactActivity", 'Int'>
    readonly organizerId: FieldRef<"ContactActivity", 'Int'>
    readonly type: FieldRef<"ContactActivity", 'String'>
    readonly text: FieldRef<"ContactActivity", 'String'>
    readonly createdAt: FieldRef<"ContactActivity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContactActivity findUnique
   */
  export type ContactActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactActivity
     */
    select?: ContactActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactActivity
     */
    omit?: ContactActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactActivityInclude<ExtArgs> | null
    /**
     * Filter, which ContactActivity to fetch.
     */
    where: ContactActivityWhereUniqueInput
  }

  /**
   * ContactActivity findUniqueOrThrow
   */
  export type ContactActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactActivity
     */
    select?: ContactActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactActivity
     */
    omit?: ContactActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactActivityInclude<ExtArgs> | null
    /**
     * Filter, which ContactActivity to fetch.
     */
    where: ContactActivityWhereUniqueInput
  }

  /**
   * ContactActivity findFirst
   */
  export type ContactActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactActivity
     */
    select?: ContactActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactActivity
     */
    omit?: ContactActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactActivityInclude<ExtArgs> | null
    /**
     * Filter, which ContactActivity to fetch.
     */
    where?: ContactActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactActivities to fetch.
     */
    orderBy?: ContactActivityOrderByWithRelationInput | ContactActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactActivities.
     */
    cursor?: ContactActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactActivities.
     */
    distinct?: ContactActivityScalarFieldEnum | ContactActivityScalarFieldEnum[]
  }

  /**
   * ContactActivity findFirstOrThrow
   */
  export type ContactActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactActivity
     */
    select?: ContactActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactActivity
     */
    omit?: ContactActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactActivityInclude<ExtArgs> | null
    /**
     * Filter, which ContactActivity to fetch.
     */
    where?: ContactActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactActivities to fetch.
     */
    orderBy?: ContactActivityOrderByWithRelationInput | ContactActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactActivities.
     */
    cursor?: ContactActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactActivities.
     */
    distinct?: ContactActivityScalarFieldEnum | ContactActivityScalarFieldEnum[]
  }

  /**
   * ContactActivity findMany
   */
  export type ContactActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactActivity
     */
    select?: ContactActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactActivity
     */
    omit?: ContactActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactActivityInclude<ExtArgs> | null
    /**
     * Filter, which ContactActivities to fetch.
     */
    where?: ContactActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactActivities to fetch.
     */
    orderBy?: ContactActivityOrderByWithRelationInput | ContactActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactActivities.
     */
    cursor?: ContactActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactActivities.
     */
    distinct?: ContactActivityScalarFieldEnum | ContactActivityScalarFieldEnum[]
  }

  /**
   * ContactActivity create
   */
  export type ContactActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactActivity
     */
    select?: ContactActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactActivity
     */
    omit?: ContactActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a ContactActivity.
     */
    data: XOR<ContactActivityCreateInput, ContactActivityUncheckedCreateInput>
  }

  /**
   * ContactActivity createMany
   */
  export type ContactActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactActivities.
     */
    data: ContactActivityCreateManyInput | ContactActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactActivity update
   */
  export type ContactActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactActivity
     */
    select?: ContactActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactActivity
     */
    omit?: ContactActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a ContactActivity.
     */
    data: XOR<ContactActivityUpdateInput, ContactActivityUncheckedUpdateInput>
    /**
     * Choose, which ContactActivity to update.
     */
    where: ContactActivityWhereUniqueInput
  }

  /**
   * ContactActivity updateMany
   */
  export type ContactActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactActivities.
     */
    data: XOR<ContactActivityUpdateManyMutationInput, ContactActivityUncheckedUpdateManyInput>
    /**
     * Filter which ContactActivities to update
     */
    where?: ContactActivityWhereInput
    /**
     * Limit how many ContactActivities to update.
     */
    limit?: number
  }

  /**
   * ContactActivity upsert
   */
  export type ContactActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactActivity
     */
    select?: ContactActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactActivity
     */
    omit?: ContactActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the ContactActivity to update in case it exists.
     */
    where: ContactActivityWhereUniqueInput
    /**
     * In case the ContactActivity found by the `where` argument doesn't exist, create a new ContactActivity with this data.
     */
    create: XOR<ContactActivityCreateInput, ContactActivityUncheckedCreateInput>
    /**
     * In case the ContactActivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactActivityUpdateInput, ContactActivityUncheckedUpdateInput>
  }

  /**
   * ContactActivity delete
   */
  export type ContactActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactActivity
     */
    select?: ContactActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactActivity
     */
    omit?: ContactActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactActivityInclude<ExtArgs> | null
    /**
     * Filter which ContactActivity to delete.
     */
    where: ContactActivityWhereUniqueInput
  }

  /**
   * ContactActivity deleteMany
   */
  export type ContactActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactActivities to delete
     */
    where?: ContactActivityWhereInput
    /**
     * Limit how many ContactActivities to delete.
     */
    limit?: number
  }

  /**
   * ContactActivity without action
   */
  export type ContactActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactActivity
     */
    select?: ContactActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactActivity
     */
    omit?: ContactActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactActivityInclude<ExtArgs> | null
  }


  /**
   * Model Venue
   */

  export type AggregateVenue = {
    _count: VenueCountAggregateOutputType | null
    _avg: VenueAvgAggregateOutputType | null
    _sum: VenueSumAggregateOutputType | null
    _min: VenueMinAggregateOutputType | null
    _max: VenueMaxAggregateOutputType | null
  }

  export type VenueAvgAggregateOutputType = {
    id: number | null
  }

  export type VenueSumAggregateOutputType = {
    id: number | null
  }

  export type VenueMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    website: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VenueMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    website: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VenueCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    website: number
    location: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VenueAvgAggregateInputType = {
    id?: true
  }

  export type VenueSumAggregateInputType = {
    id?: true
  }

  export type VenueMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    website?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VenueMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    website?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VenueCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    website?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VenueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venue to aggregate.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Venues
    **/
    _count?: true | VenueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VenueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VenueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VenueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VenueMaxAggregateInputType
  }

  export type GetVenueAggregateType<T extends VenueAggregateArgs> = {
        [P in keyof T & keyof AggregateVenue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVenue[P]>
      : GetScalarType<T[P], AggregateVenue[P]>
  }




  export type VenueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VenueWhereInput
    orderBy?: VenueOrderByWithAggregationInput | VenueOrderByWithAggregationInput[]
    by: VenueScalarFieldEnum[] | VenueScalarFieldEnum
    having?: VenueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VenueCountAggregateInputType | true
    _avg?: VenueAvgAggregateInputType
    _sum?: VenueSumAggregateInputType
    _min?: VenueMinAggregateInputType
    _max?: VenueMaxAggregateInputType
  }

  export type VenueGroupByOutputType = {
    id: number
    name: string
    slug: string
    website: string | null
    location: string | null
    createdAt: Date
    updatedAt: Date
    _count: VenueCountAggregateOutputType | null
    _avg: VenueAvgAggregateOutputType | null
    _sum: VenueSumAggregateOutputType | null
    _min: VenueMinAggregateOutputType | null
    _max: VenueMaxAggregateOutputType | null
  }

  type GetVenueGroupByPayload<T extends VenueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VenueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VenueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VenueGroupByOutputType[P]>
            : GetScalarType<T[P], VenueGroupByOutputType[P]>
        }
      >
    >


  export type VenueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    website?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    events?: boolean | Venue$eventsArgs<ExtArgs>
    _count?: boolean | VenueCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venue"]>



  export type VenueSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    website?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VenueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "website" | "location" | "createdAt" | "updatedAt", ExtArgs["result"]["venue"]>
  export type VenueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | Venue$eventsArgs<ExtArgs>
    _count?: boolean | VenueCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $VenuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Venue"
    objects: {
      events: Prisma.$EventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      website: string | null
      location: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["venue"]>
    composites: {}
  }

  type VenueGetPayload<S extends boolean | null | undefined | VenueDefaultArgs> = $Result.GetResult<Prisma.$VenuePayload, S>

  type VenueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VenueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VenueCountAggregateInputType | true
    }

  export interface VenueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Venue'], meta: { name: 'Venue' } }
    /**
     * Find zero or one Venue that matches the filter.
     * @param {VenueFindUniqueArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VenueFindUniqueArgs>(args: SelectSubset<T, VenueFindUniqueArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Venue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VenueFindUniqueOrThrowArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VenueFindUniqueOrThrowArgs>(args: SelectSubset<T, VenueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindFirstArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VenueFindFirstArgs>(args?: SelectSubset<T, VenueFindFirstArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindFirstOrThrowArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VenueFindFirstOrThrowArgs>(args?: SelectSubset<T, VenueFindFirstOrThrowArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Venues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Venues
     * const venues = await prisma.venue.findMany()
     * 
     * // Get first 10 Venues
     * const venues = await prisma.venue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const venueWithIdOnly = await prisma.venue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VenueFindManyArgs>(args?: SelectSubset<T, VenueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Venue.
     * @param {VenueCreateArgs} args - Arguments to create a Venue.
     * @example
     * // Create one Venue
     * const Venue = await prisma.venue.create({
     *   data: {
     *     // ... data to create a Venue
     *   }
     * })
     * 
     */
    create<T extends VenueCreateArgs>(args: SelectSubset<T, VenueCreateArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Venues.
     * @param {VenueCreateManyArgs} args - Arguments to create many Venues.
     * @example
     * // Create many Venues
     * const venue = await prisma.venue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VenueCreateManyArgs>(args?: SelectSubset<T, VenueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Venue.
     * @param {VenueDeleteArgs} args - Arguments to delete one Venue.
     * @example
     * // Delete one Venue
     * const Venue = await prisma.venue.delete({
     *   where: {
     *     // ... filter to delete one Venue
     *   }
     * })
     * 
     */
    delete<T extends VenueDeleteArgs>(args: SelectSubset<T, VenueDeleteArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Venue.
     * @param {VenueUpdateArgs} args - Arguments to update one Venue.
     * @example
     * // Update one Venue
     * const venue = await prisma.venue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VenueUpdateArgs>(args: SelectSubset<T, VenueUpdateArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Venues.
     * @param {VenueDeleteManyArgs} args - Arguments to filter Venues to delete.
     * @example
     * // Delete a few Venues
     * const { count } = await prisma.venue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VenueDeleteManyArgs>(args?: SelectSubset<T, VenueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Venues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Venues
     * const venue = await prisma.venue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VenueUpdateManyArgs>(args: SelectSubset<T, VenueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Venue.
     * @param {VenueUpsertArgs} args - Arguments to update or create a Venue.
     * @example
     * // Update or create a Venue
     * const venue = await prisma.venue.upsert({
     *   create: {
     *     // ... data to create a Venue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Venue we want to update
     *   }
     * })
     */
    upsert<T extends VenueUpsertArgs>(args: SelectSubset<T, VenueUpsertArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Venues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueCountArgs} args - Arguments to filter Venues to count.
     * @example
     * // Count the number of Venues
     * const count = await prisma.venue.count({
     *   where: {
     *     // ... the filter for the Venues we want to count
     *   }
     * })
    **/
    count<T extends VenueCountArgs>(
      args?: Subset<T, VenueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VenueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Venue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VenueAggregateArgs>(args: Subset<T, VenueAggregateArgs>): Prisma.PrismaPromise<GetVenueAggregateType<T>>

    /**
     * Group by Venue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VenueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VenueGroupByArgs['orderBy'] }
        : { orderBy?: VenueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VenueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVenueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Venue model
   */
  readonly fields: VenueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Venue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VenueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends Venue$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Venue$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Venue model
   */
  interface VenueFieldRefs {
    readonly id: FieldRef<"Venue", 'Int'>
    readonly name: FieldRef<"Venue", 'String'>
    readonly slug: FieldRef<"Venue", 'String'>
    readonly website: FieldRef<"Venue", 'String'>
    readonly location: FieldRef<"Venue", 'String'>
    readonly createdAt: FieldRef<"Venue", 'DateTime'>
    readonly updatedAt: FieldRef<"Venue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Venue findUnique
   */
  export type VenueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue findUniqueOrThrow
   */
  export type VenueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue findFirst
   */
  export type VenueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Venues.
     */
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue findFirstOrThrow
   */
  export type VenueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Venues.
     */
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue findMany
   */
  export type VenueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venues to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Venues.
     */
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue create
   */
  export type VenueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The data needed to create a Venue.
     */
    data: XOR<VenueCreateInput, VenueUncheckedCreateInput>
  }

  /**
   * Venue createMany
   */
  export type VenueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Venues.
     */
    data: VenueCreateManyInput | VenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Venue update
   */
  export type VenueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The data needed to update a Venue.
     */
    data: XOR<VenueUpdateInput, VenueUncheckedUpdateInput>
    /**
     * Choose, which Venue to update.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue updateMany
   */
  export type VenueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Venues.
     */
    data: XOR<VenueUpdateManyMutationInput, VenueUncheckedUpdateManyInput>
    /**
     * Filter which Venues to update
     */
    where?: VenueWhereInput
    /**
     * Limit how many Venues to update.
     */
    limit?: number
  }

  /**
   * Venue upsert
   */
  export type VenueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The filter to search for the Venue to update in case it exists.
     */
    where: VenueWhereUniqueInput
    /**
     * In case the Venue found by the `where` argument doesn't exist, create a new Venue with this data.
     */
    create: XOR<VenueCreateInput, VenueUncheckedCreateInput>
    /**
     * In case the Venue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VenueUpdateInput, VenueUncheckedUpdateInput>
  }

  /**
   * Venue delete
   */
  export type VenueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter which Venue to delete.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue deleteMany
   */
  export type VenueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venues to delete
     */
    where?: VenueWhereInput
    /**
     * Limit how many Venues to delete.
     */
    limit?: number
  }

  /**
   * Venue.events
   */
  export type Venue$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Venue without action
   */
  export type VenueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    id: number | null
    organizerId: number | null
    venueId: number | null
  }

  export type EventSumAggregateOutputType = {
    id: number | null
    organizerId: number | null
    venueId: number | null
  }

  export type EventMinAggregateOutputType = {
    id: number | null
    title: string | null
    source: $Enums.EventSource | null
    sourceUrl: string | null
    category: string | null
    hall: string | null
    imageUrl: string | null
    organizerName: string | null
    organizerContactName: string | null
    organizerPhone: string | null
    organizerEmail: string | null
    organizerWebsite: string | null
    organizerFacebook: string | null
    outreachStatus: string | null
    organizerId: number | null
    startsAt: Date | null
    endsAt: Date | null
    venueId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: number | null
    title: string | null
    source: $Enums.EventSource | null
    sourceUrl: string | null
    category: string | null
    hall: string | null
    imageUrl: string | null
    organizerName: string | null
    organizerContactName: string | null
    organizerPhone: string | null
    organizerEmail: string | null
    organizerWebsite: string | null
    organizerFacebook: string | null
    outreachStatus: string | null
    organizerId: number | null
    startsAt: Date | null
    endsAt: Date | null
    venueId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    title: number
    source: number
    sourceUrl: number
    category: number
    hall: number
    imageUrl: number
    organizerName: number
    organizerContactName: number
    organizerPhone: number
    organizerEmail: number
    organizerWebsite: number
    organizerFacebook: number
    outreachStatus: number
    organizerId: number
    startsAt: number
    endsAt: number
    venueId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    id?: true
    organizerId?: true
    venueId?: true
  }

  export type EventSumAggregateInputType = {
    id?: true
    organizerId?: true
    venueId?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    title?: true
    source?: true
    sourceUrl?: true
    category?: true
    hall?: true
    imageUrl?: true
    organizerName?: true
    organizerContactName?: true
    organizerPhone?: true
    organizerEmail?: true
    organizerWebsite?: true
    organizerFacebook?: true
    outreachStatus?: true
    organizerId?: true
    startsAt?: true
    endsAt?: true
    venueId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    title?: true
    source?: true
    sourceUrl?: true
    category?: true
    hall?: true
    imageUrl?: true
    organizerName?: true
    organizerContactName?: true
    organizerPhone?: true
    organizerEmail?: true
    organizerWebsite?: true
    organizerFacebook?: true
    outreachStatus?: true
    organizerId?: true
    startsAt?: true
    endsAt?: true
    venueId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    title?: true
    source?: true
    sourceUrl?: true
    category?: true
    hall?: true
    imageUrl?: true
    organizerName?: true
    organizerContactName?: true
    organizerPhone?: true
    organizerEmail?: true
    organizerWebsite?: true
    organizerFacebook?: true
    outreachStatus?: true
    organizerId?: true
    startsAt?: true
    endsAt?: true
    venueId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: number
    title: string
    source: $Enums.EventSource
    sourceUrl: string | null
    category: string | null
    hall: string | null
    imageUrl: string | null
    organizerName: string | null
    organizerContactName: string | null
    organizerPhone: string | null
    organizerEmail: string | null
    organizerWebsite: string | null
    organizerFacebook: string | null
    outreachStatus: string
    organizerId: number | null
    startsAt: Date
    endsAt: Date | null
    venueId: number
    createdAt: Date
    updatedAt: Date
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    source?: boolean
    sourceUrl?: boolean
    category?: boolean
    hall?: boolean
    imageUrl?: boolean
    organizerName?: boolean
    organizerContactName?: boolean
    organizerPhone?: boolean
    organizerEmail?: boolean
    organizerWebsite?: boolean
    organizerFacebook?: boolean
    outreachStatus?: boolean
    organizerId?: boolean
    startsAt?: boolean
    endsAt?: boolean
    venueId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizer?: boolean | Event$organizerArgs<ExtArgs>
    venue?: boolean | VenueDefaultArgs<ExtArgs>
    leads?: boolean | Event$leadsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>



  export type EventSelectScalar = {
    id?: boolean
    title?: boolean
    source?: boolean
    sourceUrl?: boolean
    category?: boolean
    hall?: boolean
    imageUrl?: boolean
    organizerName?: boolean
    organizerContactName?: boolean
    organizerPhone?: boolean
    organizerEmail?: boolean
    organizerWebsite?: boolean
    organizerFacebook?: boolean
    outreachStatus?: boolean
    organizerId?: boolean
    startsAt?: boolean
    endsAt?: boolean
    venueId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "source" | "sourceUrl" | "category" | "hall" | "imageUrl" | "organizerName" | "organizerContactName" | "organizerPhone" | "organizerEmail" | "organizerWebsite" | "organizerFacebook" | "outreachStatus" | "organizerId" | "startsAt" | "endsAt" | "venueId" | "createdAt" | "updatedAt", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizer?: boolean | Event$organizerArgs<ExtArgs>
    venue?: boolean | VenueDefaultArgs<ExtArgs>
    leads?: boolean | Event$leadsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      organizer: Prisma.$OrganizerPayload<ExtArgs> | null
      venue: Prisma.$VenuePayload<ExtArgs>
      leads: Prisma.$LeadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      source: $Enums.EventSource
      sourceUrl: string | null
      category: string | null
      hall: string | null
      imageUrl: string | null
      organizerName: string | null
      organizerContactName: string | null
      organizerPhone: string | null
      organizerEmail: string | null
      organizerWebsite: string | null
      organizerFacebook: string | null
      outreachStatus: string
      organizerId: number | null
      startsAt: Date
      endsAt: Date | null
      venueId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizer<T extends Event$organizerArgs<ExtArgs> = {}>(args?: Subset<T, Event$organizerArgs<ExtArgs>>): Prisma__OrganizerClient<$Result.GetResult<Prisma.$OrganizerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    venue<T extends VenueDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VenueDefaultArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    leads<T extends Event$leadsArgs<ExtArgs> = {}>(args?: Subset<T, Event$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'Int'>
    readonly title: FieldRef<"Event", 'String'>
    readonly source: FieldRef<"Event", 'EventSource'>
    readonly sourceUrl: FieldRef<"Event", 'String'>
    readonly category: FieldRef<"Event", 'String'>
    readonly hall: FieldRef<"Event", 'String'>
    readonly imageUrl: FieldRef<"Event", 'String'>
    readonly organizerName: FieldRef<"Event", 'String'>
    readonly organizerContactName: FieldRef<"Event", 'String'>
    readonly organizerPhone: FieldRef<"Event", 'String'>
    readonly organizerEmail: FieldRef<"Event", 'String'>
    readonly organizerWebsite: FieldRef<"Event", 'String'>
    readonly organizerFacebook: FieldRef<"Event", 'String'>
    readonly outreachStatus: FieldRef<"Event", 'String'>
    readonly organizerId: FieldRef<"Event", 'Int'>
    readonly startsAt: FieldRef<"Event", 'DateTime'>
    readonly endsAt: FieldRef<"Event", 'DateTime'>
    readonly venueId: FieldRef<"Event", 'Int'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly updatedAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.organizer
   */
  export type Event$organizerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizer
     */
    select?: OrganizerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizer
     */
    omit?: OrganizerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizerInclude<ExtArgs> | null
    where?: OrganizerWhereInput
  }

  /**
   * Event.leads
   */
  export type Event$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadAvgAggregateOutputType = {
    id: number | null
    eventId: number | null
  }

  export type LeadSumAggregateOutputType = {
    id: number | null
    eventId: number | null
  }

  export type LeadMinAggregateOutputType = {
    id: number | null
    companyName: string | null
    contactName: string | null
    phone: string | null
    email: string | null
    status: $Enums.LeadStatus | null
    priority: $Enums.LeadPriority | null
    note: string | null
    eventId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadMaxAggregateOutputType = {
    id: number | null
    companyName: string | null
    contactName: string | null
    phone: string | null
    email: string | null
    status: $Enums.LeadStatus | null
    priority: $Enums.LeadPriority | null
    note: string | null
    eventId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    companyName: number
    contactName: number
    phone: number
    email: number
    status: number
    priority: number
    note: number
    eventId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeadAvgAggregateInputType = {
    id?: true
    eventId?: true
  }

  export type LeadSumAggregateInputType = {
    id?: true
    eventId?: true
  }

  export type LeadMinAggregateInputType = {
    id?: true
    companyName?: true
    contactName?: true
    phone?: true
    email?: true
    status?: true
    priority?: true
    note?: true
    eventId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    companyName?: true
    contactName?: true
    phone?: true
    email?: true
    status?: true
    priority?: true
    note?: true
    eventId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    companyName?: true
    contactName?: true
    phone?: true
    email?: true
    status?: true
    priority?: true
    note?: true
    eventId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _avg?: LeadAvgAggregateInputType
    _sum?: LeadSumAggregateInputType
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: number
    companyName: string
    contactName: string | null
    phone: string | null
    email: string | null
    status: $Enums.LeadStatus
    priority: $Enums.LeadPriority
    note: string | null
    eventId: number | null
    createdAt: Date
    updatedAt: Date
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    contactName?: boolean
    phone?: boolean
    email?: boolean
    status?: boolean
    priority?: boolean
    note?: boolean
    eventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | Lead$eventArgs<ExtArgs>
    activities?: boolean | Lead$activitiesArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>



  export type LeadSelectScalar = {
    id?: boolean
    companyName?: boolean
    contactName?: boolean
    phone?: boolean
    email?: boolean
    status?: boolean
    priority?: boolean
    note?: boolean
    eventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyName" | "contactName" | "phone" | "email" | "status" | "priority" | "note" | "eventId" | "createdAt" | "updatedAt", ExtArgs["result"]["lead"]>
  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | Lead$eventArgs<ExtArgs>
    activities?: boolean | Lead$activitiesArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      event: Prisma.$EventPayload<ExtArgs> | null
      activities: Prisma.$ActivityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      companyName: string
      contactName: string | null
      phone: string | null
      email: string | null
      status: $Enums.LeadStatus
      priority: $Enums.LeadPriority
      note: string | null
      eventId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends Lead$eventArgs<ExtArgs> = {}>(args?: Subset<T, Lead$eventArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    activities<T extends Lead$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Lead$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'Int'>
    readonly companyName: FieldRef<"Lead", 'String'>
    readonly contactName: FieldRef<"Lead", 'String'>
    readonly phone: FieldRef<"Lead", 'String'>
    readonly email: FieldRef<"Lead", 'String'>
    readonly status: FieldRef<"Lead", 'LeadStatus'>
    readonly priority: FieldRef<"Lead", 'LeadPriority'>
    readonly note: FieldRef<"Lead", 'String'>
    readonly eventId: FieldRef<"Lead", 'Int'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
    readonly updatedAt: FieldRef<"Lead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to delete.
     */
    limit?: number
  }

  /**
   * Lead.event
   */
  export type Lead$eventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
  }

  /**
   * Lead.activities
   */
  export type Lead$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityAvgAggregateOutputType = {
    id: number | null
    leadId: number | null
  }

  export type ActivitySumAggregateOutputType = {
    id: number | null
    leadId: number | null
  }

  export type ActivityMinAggregateOutputType = {
    id: number | null
    leadId: number | null
    title: string | null
    dueAt: Date | null
    done: boolean | null
    createdAt: Date | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: number | null
    leadId: number | null
    title: string | null
    dueAt: Date | null
    done: boolean | null
    createdAt: Date | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    leadId: number
    title: number
    dueAt: number
    done: number
    createdAt: number
    _all: number
  }


  export type ActivityAvgAggregateInputType = {
    id?: true
    leadId?: true
  }

  export type ActivitySumAggregateInputType = {
    id?: true
    leadId?: true
  }

  export type ActivityMinAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    dueAt?: true
    done?: true
    createdAt?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    dueAt?: true
    done?: true
    createdAt?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    leadId?: true
    title?: true
    dueAt?: true
    done?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _avg?: ActivityAvgAggregateInputType
    _sum?: ActivitySumAggregateInputType
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: number
    leadId: number
    title: string
    dueAt: Date | null
    done: boolean
    createdAt: Date
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    title?: boolean
    dueAt?: boolean
    done?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>



  export type ActivitySelectScalar = {
    id?: boolean
    leadId?: boolean
    title?: boolean
    dueAt?: boolean
    done?: boolean
    createdAt?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "leadId" | "title" | "dueAt" | "done" | "createdAt", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      leadId: number
      title: string
      dueAt: Date | null
      done: boolean
      createdAt: Date
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'Int'>
    readonly leadId: FieldRef<"Activity", 'Int'>
    readonly title: FieldRef<"Activity", 'String'>
    readonly dueAt: FieldRef<"Activity", 'DateTime'>
    readonly done: FieldRef<"Activity", 'Boolean'>
    readonly createdAt: FieldRef<"Activity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model EmailTemplate
   */

  export type AggregateEmailTemplate = {
    _count: EmailTemplateCountAggregateOutputType | null
    _avg: EmailTemplateAvgAggregateOutputType | null
    _sum: EmailTemplateSumAggregateOutputType | null
    _min: EmailTemplateMinAggregateOutputType | null
    _max: EmailTemplateMaxAggregateOutputType | null
  }

  export type EmailTemplateAvgAggregateOutputType = {
    id: number | null
  }

  export type EmailTemplateSumAggregateOutputType = {
    id: number | null
  }

  export type EmailTemplateMinAggregateOutputType = {
    id: number | null
    name: string | null
    subject: string | null
    body: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailTemplateMaxAggregateOutputType = {
    id: number | null
    name: string | null
    subject: string | null
    body: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailTemplateCountAggregateOutputType = {
    id: number
    name: number
    subject: number
    body: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmailTemplateAvgAggregateInputType = {
    id?: true
  }

  export type EmailTemplateSumAggregateInputType = {
    id?: true
  }

  export type EmailTemplateMinAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    body?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailTemplateMaxAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    body?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailTemplateCountAggregateInputType = {
    id?: true
    name?: true
    subject?: true
    body?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmailTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailTemplate to aggregate.
     */
    where?: EmailTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailTemplates to fetch.
     */
    orderBy?: EmailTemplateOrderByWithRelationInput | EmailTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailTemplates
    **/
    _count?: true | EmailTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailTemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailTemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailTemplateMaxAggregateInputType
  }

  export type GetEmailTemplateAggregateType<T extends EmailTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailTemplate[P]>
      : GetScalarType<T[P], AggregateEmailTemplate[P]>
  }




  export type EmailTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailTemplateWhereInput
    orderBy?: EmailTemplateOrderByWithAggregationInput | EmailTemplateOrderByWithAggregationInput[]
    by: EmailTemplateScalarFieldEnum[] | EmailTemplateScalarFieldEnum
    having?: EmailTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailTemplateCountAggregateInputType | true
    _avg?: EmailTemplateAvgAggregateInputType
    _sum?: EmailTemplateSumAggregateInputType
    _min?: EmailTemplateMinAggregateInputType
    _max?: EmailTemplateMaxAggregateInputType
  }

  export type EmailTemplateGroupByOutputType = {
    id: number
    name: string
    subject: string
    body: string
    createdAt: Date
    updatedAt: Date
    _count: EmailTemplateCountAggregateOutputType | null
    _avg: EmailTemplateAvgAggregateOutputType | null
    _sum: EmailTemplateSumAggregateOutputType | null
    _min: EmailTemplateMinAggregateOutputType | null
    _max: EmailTemplateMaxAggregateOutputType | null
  }

  type GetEmailTemplateGroupByPayload<T extends EmailTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], EmailTemplateGroupByOutputType[P]>
        }
      >
    >


  export type EmailTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subject?: boolean
    body?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    campaigns?: boolean | EmailTemplate$campaignsArgs<ExtArgs>
    _count?: boolean | EmailTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailTemplate"]>



  export type EmailTemplateSelectScalar = {
    id?: boolean
    name?: boolean
    subject?: boolean
    body?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmailTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "subject" | "body" | "createdAt" | "updatedAt", ExtArgs["result"]["emailTemplate"]>
  export type EmailTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaigns?: boolean | EmailTemplate$campaignsArgs<ExtArgs>
    _count?: boolean | EmailTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EmailTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailTemplate"
    objects: {
      campaigns: Prisma.$EmailCampaignPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      subject: string
      body: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["emailTemplate"]>
    composites: {}
  }

  type EmailTemplateGetPayload<S extends boolean | null | undefined | EmailTemplateDefaultArgs> = $Result.GetResult<Prisma.$EmailTemplatePayload, S>

  type EmailTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailTemplateCountAggregateInputType | true
    }

  export interface EmailTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailTemplate'], meta: { name: 'EmailTemplate' } }
    /**
     * Find zero or one EmailTemplate that matches the filter.
     * @param {EmailTemplateFindUniqueArgs} args - Arguments to find a EmailTemplate
     * @example
     * // Get one EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailTemplateFindUniqueArgs>(args: SelectSubset<T, EmailTemplateFindUniqueArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailTemplateFindUniqueOrThrowArgs} args - Arguments to find a EmailTemplate
     * @example
     * // Get one EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateFindFirstArgs} args - Arguments to find a EmailTemplate
     * @example
     * // Get one EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailTemplateFindFirstArgs>(args?: SelectSubset<T, EmailTemplateFindFirstArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateFindFirstOrThrowArgs} args - Arguments to find a EmailTemplate
     * @example
     * // Get one EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailTemplates
     * const emailTemplates = await prisma.emailTemplate.findMany()
     * 
     * // Get first 10 EmailTemplates
     * const emailTemplates = await prisma.emailTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailTemplateWithIdOnly = await prisma.emailTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailTemplateFindManyArgs>(args?: SelectSubset<T, EmailTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailTemplate.
     * @param {EmailTemplateCreateArgs} args - Arguments to create a EmailTemplate.
     * @example
     * // Create one EmailTemplate
     * const EmailTemplate = await prisma.emailTemplate.create({
     *   data: {
     *     // ... data to create a EmailTemplate
     *   }
     * })
     * 
     */
    create<T extends EmailTemplateCreateArgs>(args: SelectSubset<T, EmailTemplateCreateArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailTemplates.
     * @param {EmailTemplateCreateManyArgs} args - Arguments to create many EmailTemplates.
     * @example
     * // Create many EmailTemplates
     * const emailTemplate = await prisma.emailTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailTemplateCreateManyArgs>(args?: SelectSubset<T, EmailTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EmailTemplate.
     * @param {EmailTemplateDeleteArgs} args - Arguments to delete one EmailTemplate.
     * @example
     * // Delete one EmailTemplate
     * const EmailTemplate = await prisma.emailTemplate.delete({
     *   where: {
     *     // ... filter to delete one EmailTemplate
     *   }
     * })
     * 
     */
    delete<T extends EmailTemplateDeleteArgs>(args: SelectSubset<T, EmailTemplateDeleteArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailTemplate.
     * @param {EmailTemplateUpdateArgs} args - Arguments to update one EmailTemplate.
     * @example
     * // Update one EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailTemplateUpdateArgs>(args: SelectSubset<T, EmailTemplateUpdateArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailTemplates.
     * @param {EmailTemplateDeleteManyArgs} args - Arguments to filter EmailTemplates to delete.
     * @example
     * // Delete a few EmailTemplates
     * const { count } = await prisma.emailTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailTemplateDeleteManyArgs>(args?: SelectSubset<T, EmailTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailTemplates
     * const emailTemplate = await prisma.emailTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailTemplateUpdateManyArgs>(args: SelectSubset<T, EmailTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmailTemplate.
     * @param {EmailTemplateUpsertArgs} args - Arguments to update or create a EmailTemplate.
     * @example
     * // Update or create a EmailTemplate
     * const emailTemplate = await prisma.emailTemplate.upsert({
     *   create: {
     *     // ... data to create a EmailTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailTemplate we want to update
     *   }
     * })
     */
    upsert<T extends EmailTemplateUpsertArgs>(args: SelectSubset<T, EmailTemplateUpsertArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateCountArgs} args - Arguments to filter EmailTemplates to count.
     * @example
     * // Count the number of EmailTemplates
     * const count = await prisma.emailTemplate.count({
     *   where: {
     *     // ... the filter for the EmailTemplates we want to count
     *   }
     * })
    **/
    count<T extends EmailTemplateCountArgs>(
      args?: Subset<T, EmailTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailTemplateAggregateArgs>(args: Subset<T, EmailTemplateAggregateArgs>): Prisma.PrismaPromise<GetEmailTemplateAggregateType<T>>

    /**
     * Group by EmailTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailTemplateGroupByArgs['orderBy'] }
        : { orderBy?: EmailTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailTemplate model
   */
  readonly fields: EmailTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaigns<T extends EmailTemplate$campaignsArgs<ExtArgs> = {}>(args?: Subset<T, EmailTemplate$campaignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailCampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailTemplate model
   */
  interface EmailTemplateFieldRefs {
    readonly id: FieldRef<"EmailTemplate", 'Int'>
    readonly name: FieldRef<"EmailTemplate", 'String'>
    readonly subject: FieldRef<"EmailTemplate", 'String'>
    readonly body: FieldRef<"EmailTemplate", 'String'>
    readonly createdAt: FieldRef<"EmailTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"EmailTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailTemplate findUnique
   */
  export type EmailTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailTemplateInclude<ExtArgs> | null
    /**
     * Filter, which EmailTemplate to fetch.
     */
    where: EmailTemplateWhereUniqueInput
  }

  /**
   * EmailTemplate findUniqueOrThrow
   */
  export type EmailTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailTemplateInclude<ExtArgs> | null
    /**
     * Filter, which EmailTemplate to fetch.
     */
    where: EmailTemplateWhereUniqueInput
  }

  /**
   * EmailTemplate findFirst
   */
  export type EmailTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailTemplateInclude<ExtArgs> | null
    /**
     * Filter, which EmailTemplate to fetch.
     */
    where?: EmailTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailTemplates to fetch.
     */
    orderBy?: EmailTemplateOrderByWithRelationInput | EmailTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailTemplates.
     */
    cursor?: EmailTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailTemplates.
     */
    distinct?: EmailTemplateScalarFieldEnum | EmailTemplateScalarFieldEnum[]
  }

  /**
   * EmailTemplate findFirstOrThrow
   */
  export type EmailTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailTemplateInclude<ExtArgs> | null
    /**
     * Filter, which EmailTemplate to fetch.
     */
    where?: EmailTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailTemplates to fetch.
     */
    orderBy?: EmailTemplateOrderByWithRelationInput | EmailTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailTemplates.
     */
    cursor?: EmailTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailTemplates.
     */
    distinct?: EmailTemplateScalarFieldEnum | EmailTemplateScalarFieldEnum[]
  }

  /**
   * EmailTemplate findMany
   */
  export type EmailTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailTemplateInclude<ExtArgs> | null
    /**
     * Filter, which EmailTemplates to fetch.
     */
    where?: EmailTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailTemplates to fetch.
     */
    orderBy?: EmailTemplateOrderByWithRelationInput | EmailTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailTemplates.
     */
    cursor?: EmailTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailTemplates.
     */
    distinct?: EmailTemplateScalarFieldEnum | EmailTemplateScalarFieldEnum[]
  }

  /**
   * EmailTemplate create
   */
  export type EmailTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailTemplate.
     */
    data: XOR<EmailTemplateCreateInput, EmailTemplateUncheckedCreateInput>
  }

  /**
   * EmailTemplate createMany
   */
  export type EmailTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailTemplates.
     */
    data: EmailTemplateCreateManyInput | EmailTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailTemplate update
   */
  export type EmailTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailTemplate.
     */
    data: XOR<EmailTemplateUpdateInput, EmailTemplateUncheckedUpdateInput>
    /**
     * Choose, which EmailTemplate to update.
     */
    where: EmailTemplateWhereUniqueInput
  }

  /**
   * EmailTemplate updateMany
   */
  export type EmailTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailTemplates.
     */
    data: XOR<EmailTemplateUpdateManyMutationInput, EmailTemplateUncheckedUpdateManyInput>
    /**
     * Filter which EmailTemplates to update
     */
    where?: EmailTemplateWhereInput
    /**
     * Limit how many EmailTemplates to update.
     */
    limit?: number
  }

  /**
   * EmailTemplate upsert
   */
  export type EmailTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailTemplate to update in case it exists.
     */
    where: EmailTemplateWhereUniqueInput
    /**
     * In case the EmailTemplate found by the `where` argument doesn't exist, create a new EmailTemplate with this data.
     */
    create: XOR<EmailTemplateCreateInput, EmailTemplateUncheckedCreateInput>
    /**
     * In case the EmailTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailTemplateUpdateInput, EmailTemplateUncheckedUpdateInput>
  }

  /**
   * EmailTemplate delete
   */
  export type EmailTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailTemplateInclude<ExtArgs> | null
    /**
     * Filter which EmailTemplate to delete.
     */
    where: EmailTemplateWhereUniqueInput
  }

  /**
   * EmailTemplate deleteMany
   */
  export type EmailTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailTemplates to delete
     */
    where?: EmailTemplateWhereInput
    /**
     * Limit how many EmailTemplates to delete.
     */
    limit?: number
  }

  /**
   * EmailTemplate.campaigns
   */
  export type EmailTemplate$campaignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaign
     */
    select?: EmailCampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailCampaign
     */
    omit?: EmailCampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailCampaignInclude<ExtArgs> | null
    where?: EmailCampaignWhereInput
    orderBy?: EmailCampaignOrderByWithRelationInput | EmailCampaignOrderByWithRelationInput[]
    cursor?: EmailCampaignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailCampaignScalarFieldEnum | EmailCampaignScalarFieldEnum[]
  }

  /**
   * EmailTemplate without action
   */
  export type EmailTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailTemplate
     */
    select?: EmailTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailTemplate
     */
    omit?: EmailTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailTemplateInclude<ExtArgs> | null
  }


  /**
   * Model EmailCampaign
   */

  export type AggregateEmailCampaign = {
    _count: EmailCampaignCountAggregateOutputType | null
    _avg: EmailCampaignAvgAggregateOutputType | null
    _sum: EmailCampaignSumAggregateOutputType | null
    _min: EmailCampaignMinAggregateOutputType | null
    _max: EmailCampaignMaxAggregateOutputType | null
  }

  export type EmailCampaignAvgAggregateOutputType = {
    id: number | null
    templateId: number | null
  }

  export type EmailCampaignSumAggregateOutputType = {
    id: number | null
    templateId: number | null
  }

  export type EmailCampaignMinAggregateOutputType = {
    id: number | null
    name: string | null
    templateId: number | null
    subject: string | null
    body: string | null
    status: string | null
    sentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailCampaignMaxAggregateOutputType = {
    id: number | null
    name: string | null
    templateId: number | null
    subject: string | null
    body: string | null
    status: string | null
    sentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailCampaignCountAggregateOutputType = {
    id: number
    name: number
    templateId: number
    subject: number
    body: number
    status: number
    sentAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmailCampaignAvgAggregateInputType = {
    id?: true
    templateId?: true
  }

  export type EmailCampaignSumAggregateInputType = {
    id?: true
    templateId?: true
  }

  export type EmailCampaignMinAggregateInputType = {
    id?: true
    name?: true
    templateId?: true
    subject?: true
    body?: true
    status?: true
    sentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailCampaignMaxAggregateInputType = {
    id?: true
    name?: true
    templateId?: true
    subject?: true
    body?: true
    status?: true
    sentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailCampaignCountAggregateInputType = {
    id?: true
    name?: true
    templateId?: true
    subject?: true
    body?: true
    status?: true
    sentAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmailCampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailCampaign to aggregate.
     */
    where?: EmailCampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailCampaigns to fetch.
     */
    orderBy?: EmailCampaignOrderByWithRelationInput | EmailCampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailCampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailCampaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailCampaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailCampaigns
    **/
    _count?: true | EmailCampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailCampaignAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailCampaignSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailCampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailCampaignMaxAggregateInputType
  }

  export type GetEmailCampaignAggregateType<T extends EmailCampaignAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailCampaign[P]>
      : GetScalarType<T[P], AggregateEmailCampaign[P]>
  }




  export type EmailCampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailCampaignWhereInput
    orderBy?: EmailCampaignOrderByWithAggregationInput | EmailCampaignOrderByWithAggregationInput[]
    by: EmailCampaignScalarFieldEnum[] | EmailCampaignScalarFieldEnum
    having?: EmailCampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailCampaignCountAggregateInputType | true
    _avg?: EmailCampaignAvgAggregateInputType
    _sum?: EmailCampaignSumAggregateInputType
    _min?: EmailCampaignMinAggregateInputType
    _max?: EmailCampaignMaxAggregateInputType
  }

  export type EmailCampaignGroupByOutputType = {
    id: number
    name: string
    templateId: number
    subject: string
    body: string
    status: string
    sentAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: EmailCampaignCountAggregateOutputType | null
    _avg: EmailCampaignAvgAggregateOutputType | null
    _sum: EmailCampaignSumAggregateOutputType | null
    _min: EmailCampaignMinAggregateOutputType | null
    _max: EmailCampaignMaxAggregateOutputType | null
  }

  type GetEmailCampaignGroupByPayload<T extends EmailCampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailCampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailCampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailCampaignGroupByOutputType[P]>
            : GetScalarType<T[P], EmailCampaignGroupByOutputType[P]>
        }
      >
    >


  export type EmailCampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    templateId?: boolean
    subject?: boolean
    body?: boolean
    status?: boolean
    sentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | EmailTemplateDefaultArgs<ExtArgs>
    recipients?: boolean | EmailCampaign$recipientsArgs<ExtArgs>
    _count?: boolean | EmailCampaignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailCampaign"]>



  export type EmailCampaignSelectScalar = {
    id?: boolean
    name?: boolean
    templateId?: boolean
    subject?: boolean
    body?: boolean
    status?: boolean
    sentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmailCampaignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "templateId" | "subject" | "body" | "status" | "sentAt" | "createdAt" | "updatedAt", ExtArgs["result"]["emailCampaign"]>
  export type EmailCampaignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | EmailTemplateDefaultArgs<ExtArgs>
    recipients?: boolean | EmailCampaign$recipientsArgs<ExtArgs>
    _count?: boolean | EmailCampaignCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EmailCampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailCampaign"
    objects: {
      template: Prisma.$EmailTemplatePayload<ExtArgs>
      recipients: Prisma.$EmailRecipientPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      templateId: number
      subject: string
      body: string
      status: string
      sentAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["emailCampaign"]>
    composites: {}
  }

  type EmailCampaignGetPayload<S extends boolean | null | undefined | EmailCampaignDefaultArgs> = $Result.GetResult<Prisma.$EmailCampaignPayload, S>

  type EmailCampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailCampaignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailCampaignCountAggregateInputType | true
    }

  export interface EmailCampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailCampaign'], meta: { name: 'EmailCampaign' } }
    /**
     * Find zero or one EmailCampaign that matches the filter.
     * @param {EmailCampaignFindUniqueArgs} args - Arguments to find a EmailCampaign
     * @example
     * // Get one EmailCampaign
     * const emailCampaign = await prisma.emailCampaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailCampaignFindUniqueArgs>(args: SelectSubset<T, EmailCampaignFindUniqueArgs<ExtArgs>>): Prisma__EmailCampaignClient<$Result.GetResult<Prisma.$EmailCampaignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailCampaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailCampaignFindUniqueOrThrowArgs} args - Arguments to find a EmailCampaign
     * @example
     * // Get one EmailCampaign
     * const emailCampaign = await prisma.emailCampaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailCampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailCampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailCampaignClient<$Result.GetResult<Prisma.$EmailCampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailCampaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailCampaignFindFirstArgs} args - Arguments to find a EmailCampaign
     * @example
     * // Get one EmailCampaign
     * const emailCampaign = await prisma.emailCampaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailCampaignFindFirstArgs>(args?: SelectSubset<T, EmailCampaignFindFirstArgs<ExtArgs>>): Prisma__EmailCampaignClient<$Result.GetResult<Prisma.$EmailCampaignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailCampaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailCampaignFindFirstOrThrowArgs} args - Arguments to find a EmailCampaign
     * @example
     * // Get one EmailCampaign
     * const emailCampaign = await prisma.emailCampaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailCampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailCampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailCampaignClient<$Result.GetResult<Prisma.$EmailCampaignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailCampaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailCampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailCampaigns
     * const emailCampaigns = await prisma.emailCampaign.findMany()
     * 
     * // Get first 10 EmailCampaigns
     * const emailCampaigns = await prisma.emailCampaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailCampaignWithIdOnly = await prisma.emailCampaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailCampaignFindManyArgs>(args?: SelectSubset<T, EmailCampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailCampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailCampaign.
     * @param {EmailCampaignCreateArgs} args - Arguments to create a EmailCampaign.
     * @example
     * // Create one EmailCampaign
     * const EmailCampaign = await prisma.emailCampaign.create({
     *   data: {
     *     // ... data to create a EmailCampaign
     *   }
     * })
     * 
     */
    create<T extends EmailCampaignCreateArgs>(args: SelectSubset<T, EmailCampaignCreateArgs<ExtArgs>>): Prisma__EmailCampaignClient<$Result.GetResult<Prisma.$EmailCampaignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailCampaigns.
     * @param {EmailCampaignCreateManyArgs} args - Arguments to create many EmailCampaigns.
     * @example
     * // Create many EmailCampaigns
     * const emailCampaign = await prisma.emailCampaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailCampaignCreateManyArgs>(args?: SelectSubset<T, EmailCampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EmailCampaign.
     * @param {EmailCampaignDeleteArgs} args - Arguments to delete one EmailCampaign.
     * @example
     * // Delete one EmailCampaign
     * const EmailCampaign = await prisma.emailCampaign.delete({
     *   where: {
     *     // ... filter to delete one EmailCampaign
     *   }
     * })
     * 
     */
    delete<T extends EmailCampaignDeleteArgs>(args: SelectSubset<T, EmailCampaignDeleteArgs<ExtArgs>>): Prisma__EmailCampaignClient<$Result.GetResult<Prisma.$EmailCampaignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailCampaign.
     * @param {EmailCampaignUpdateArgs} args - Arguments to update one EmailCampaign.
     * @example
     * // Update one EmailCampaign
     * const emailCampaign = await prisma.emailCampaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailCampaignUpdateArgs>(args: SelectSubset<T, EmailCampaignUpdateArgs<ExtArgs>>): Prisma__EmailCampaignClient<$Result.GetResult<Prisma.$EmailCampaignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailCampaigns.
     * @param {EmailCampaignDeleteManyArgs} args - Arguments to filter EmailCampaigns to delete.
     * @example
     * // Delete a few EmailCampaigns
     * const { count } = await prisma.emailCampaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailCampaignDeleteManyArgs>(args?: SelectSubset<T, EmailCampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailCampaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailCampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailCampaigns
     * const emailCampaign = await prisma.emailCampaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailCampaignUpdateManyArgs>(args: SelectSubset<T, EmailCampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmailCampaign.
     * @param {EmailCampaignUpsertArgs} args - Arguments to update or create a EmailCampaign.
     * @example
     * // Update or create a EmailCampaign
     * const emailCampaign = await prisma.emailCampaign.upsert({
     *   create: {
     *     // ... data to create a EmailCampaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailCampaign we want to update
     *   }
     * })
     */
    upsert<T extends EmailCampaignUpsertArgs>(args: SelectSubset<T, EmailCampaignUpsertArgs<ExtArgs>>): Prisma__EmailCampaignClient<$Result.GetResult<Prisma.$EmailCampaignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailCampaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailCampaignCountArgs} args - Arguments to filter EmailCampaigns to count.
     * @example
     * // Count the number of EmailCampaigns
     * const count = await prisma.emailCampaign.count({
     *   where: {
     *     // ... the filter for the EmailCampaigns we want to count
     *   }
     * })
    **/
    count<T extends EmailCampaignCountArgs>(
      args?: Subset<T, EmailCampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailCampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailCampaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailCampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailCampaignAggregateArgs>(args: Subset<T, EmailCampaignAggregateArgs>): Prisma.PrismaPromise<GetEmailCampaignAggregateType<T>>

    /**
     * Group by EmailCampaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailCampaignGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailCampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailCampaignGroupByArgs['orderBy'] }
        : { orderBy?: EmailCampaignGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailCampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailCampaign model
   */
  readonly fields: EmailCampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailCampaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailCampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    template<T extends EmailTemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmailTemplateDefaultArgs<ExtArgs>>): Prisma__EmailTemplateClient<$Result.GetResult<Prisma.$EmailTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recipients<T extends EmailCampaign$recipientsArgs<ExtArgs> = {}>(args?: Subset<T, EmailCampaign$recipientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailRecipientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailCampaign model
   */
  interface EmailCampaignFieldRefs {
    readonly id: FieldRef<"EmailCampaign", 'Int'>
    readonly name: FieldRef<"EmailCampaign", 'String'>
    readonly templateId: FieldRef<"EmailCampaign", 'Int'>
    readonly subject: FieldRef<"EmailCampaign", 'String'>
    readonly body: FieldRef<"EmailCampaign", 'String'>
    readonly status: FieldRef<"EmailCampaign", 'String'>
    readonly sentAt: FieldRef<"EmailCampaign", 'DateTime'>
    readonly createdAt: FieldRef<"EmailCampaign", 'DateTime'>
    readonly updatedAt: FieldRef<"EmailCampaign", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailCampaign findUnique
   */
  export type EmailCampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaign
     */
    select?: EmailCampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailCampaign
     */
    omit?: EmailCampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailCampaignInclude<ExtArgs> | null
    /**
     * Filter, which EmailCampaign to fetch.
     */
    where: EmailCampaignWhereUniqueInput
  }

  /**
   * EmailCampaign findUniqueOrThrow
   */
  export type EmailCampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaign
     */
    select?: EmailCampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailCampaign
     */
    omit?: EmailCampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailCampaignInclude<ExtArgs> | null
    /**
     * Filter, which EmailCampaign to fetch.
     */
    where: EmailCampaignWhereUniqueInput
  }

  /**
   * EmailCampaign findFirst
   */
  export type EmailCampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaign
     */
    select?: EmailCampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailCampaign
     */
    omit?: EmailCampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailCampaignInclude<ExtArgs> | null
    /**
     * Filter, which EmailCampaign to fetch.
     */
    where?: EmailCampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailCampaigns to fetch.
     */
    orderBy?: EmailCampaignOrderByWithRelationInput | EmailCampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailCampaigns.
     */
    cursor?: EmailCampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailCampaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailCampaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailCampaigns.
     */
    distinct?: EmailCampaignScalarFieldEnum | EmailCampaignScalarFieldEnum[]
  }

  /**
   * EmailCampaign findFirstOrThrow
   */
  export type EmailCampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaign
     */
    select?: EmailCampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailCampaign
     */
    omit?: EmailCampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailCampaignInclude<ExtArgs> | null
    /**
     * Filter, which EmailCampaign to fetch.
     */
    where?: EmailCampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailCampaigns to fetch.
     */
    orderBy?: EmailCampaignOrderByWithRelationInput | EmailCampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailCampaigns.
     */
    cursor?: EmailCampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailCampaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailCampaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailCampaigns.
     */
    distinct?: EmailCampaignScalarFieldEnum | EmailCampaignScalarFieldEnum[]
  }

  /**
   * EmailCampaign findMany
   */
  export type EmailCampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaign
     */
    select?: EmailCampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailCampaign
     */
    omit?: EmailCampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailCampaignInclude<ExtArgs> | null
    /**
     * Filter, which EmailCampaigns to fetch.
     */
    where?: EmailCampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailCampaigns to fetch.
     */
    orderBy?: EmailCampaignOrderByWithRelationInput | EmailCampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailCampaigns.
     */
    cursor?: EmailCampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailCampaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailCampaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailCampaigns.
     */
    distinct?: EmailCampaignScalarFieldEnum | EmailCampaignScalarFieldEnum[]
  }

  /**
   * EmailCampaign create
   */
  export type EmailCampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaign
     */
    select?: EmailCampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailCampaign
     */
    omit?: EmailCampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailCampaignInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailCampaign.
     */
    data: XOR<EmailCampaignCreateInput, EmailCampaignUncheckedCreateInput>
  }

  /**
   * EmailCampaign createMany
   */
  export type EmailCampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailCampaigns.
     */
    data: EmailCampaignCreateManyInput | EmailCampaignCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailCampaign update
   */
  export type EmailCampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaign
     */
    select?: EmailCampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailCampaign
     */
    omit?: EmailCampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailCampaignInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailCampaign.
     */
    data: XOR<EmailCampaignUpdateInput, EmailCampaignUncheckedUpdateInput>
    /**
     * Choose, which EmailCampaign to update.
     */
    where: EmailCampaignWhereUniqueInput
  }

  /**
   * EmailCampaign updateMany
   */
  export type EmailCampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailCampaigns.
     */
    data: XOR<EmailCampaignUpdateManyMutationInput, EmailCampaignUncheckedUpdateManyInput>
    /**
     * Filter which EmailCampaigns to update
     */
    where?: EmailCampaignWhereInput
    /**
     * Limit how many EmailCampaigns to update.
     */
    limit?: number
  }

  /**
   * EmailCampaign upsert
   */
  export type EmailCampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaign
     */
    select?: EmailCampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailCampaign
     */
    omit?: EmailCampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailCampaignInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailCampaign to update in case it exists.
     */
    where: EmailCampaignWhereUniqueInput
    /**
     * In case the EmailCampaign found by the `where` argument doesn't exist, create a new EmailCampaign with this data.
     */
    create: XOR<EmailCampaignCreateInput, EmailCampaignUncheckedCreateInput>
    /**
     * In case the EmailCampaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailCampaignUpdateInput, EmailCampaignUncheckedUpdateInput>
  }

  /**
   * EmailCampaign delete
   */
  export type EmailCampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaign
     */
    select?: EmailCampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailCampaign
     */
    omit?: EmailCampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailCampaignInclude<ExtArgs> | null
    /**
     * Filter which EmailCampaign to delete.
     */
    where: EmailCampaignWhereUniqueInput
  }

  /**
   * EmailCampaign deleteMany
   */
  export type EmailCampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailCampaigns to delete
     */
    where?: EmailCampaignWhereInput
    /**
     * Limit how many EmailCampaigns to delete.
     */
    limit?: number
  }

  /**
   * EmailCampaign.recipients
   */
  export type EmailCampaign$recipientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailRecipient
     */
    select?: EmailRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailRecipient
     */
    omit?: EmailRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailRecipientInclude<ExtArgs> | null
    where?: EmailRecipientWhereInput
    orderBy?: EmailRecipientOrderByWithRelationInput | EmailRecipientOrderByWithRelationInput[]
    cursor?: EmailRecipientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailRecipientScalarFieldEnum | EmailRecipientScalarFieldEnum[]
  }

  /**
   * EmailCampaign without action
   */
  export type EmailCampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCampaign
     */
    select?: EmailCampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailCampaign
     */
    omit?: EmailCampaignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailCampaignInclude<ExtArgs> | null
  }


  /**
   * Model EmailRecipient
   */

  export type AggregateEmailRecipient = {
    _count: EmailRecipientCountAggregateOutputType | null
    _avg: EmailRecipientAvgAggregateOutputType | null
    _sum: EmailRecipientSumAggregateOutputType | null
    _min: EmailRecipientMinAggregateOutputType | null
    _max: EmailRecipientMaxAggregateOutputType | null
  }

  export type EmailRecipientAvgAggregateOutputType = {
    id: number | null
    campaignId: number | null
  }

  export type EmailRecipientSumAggregateOutputType = {
    id: number | null
    campaignId: number | null
  }

  export type EmailRecipientMinAggregateOutputType = {
    id: number | null
    campaignId: number | null
    email: string | null
    name: string | null
    company: string | null
    status: string | null
    messageId: string | null
    error: string | null
    sentAt: Date | null
  }

  export type EmailRecipientMaxAggregateOutputType = {
    id: number | null
    campaignId: number | null
    email: string | null
    name: string | null
    company: string | null
    status: string | null
    messageId: string | null
    error: string | null
    sentAt: Date | null
  }

  export type EmailRecipientCountAggregateOutputType = {
    id: number
    campaignId: number
    email: number
    name: number
    company: number
    status: number
    messageId: number
    error: number
    sentAt: number
    _all: number
  }


  export type EmailRecipientAvgAggregateInputType = {
    id?: true
    campaignId?: true
  }

  export type EmailRecipientSumAggregateInputType = {
    id?: true
    campaignId?: true
  }

  export type EmailRecipientMinAggregateInputType = {
    id?: true
    campaignId?: true
    email?: true
    name?: true
    company?: true
    status?: true
    messageId?: true
    error?: true
    sentAt?: true
  }

  export type EmailRecipientMaxAggregateInputType = {
    id?: true
    campaignId?: true
    email?: true
    name?: true
    company?: true
    status?: true
    messageId?: true
    error?: true
    sentAt?: true
  }

  export type EmailRecipientCountAggregateInputType = {
    id?: true
    campaignId?: true
    email?: true
    name?: true
    company?: true
    status?: true
    messageId?: true
    error?: true
    sentAt?: true
    _all?: true
  }

  export type EmailRecipientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailRecipient to aggregate.
     */
    where?: EmailRecipientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailRecipients to fetch.
     */
    orderBy?: EmailRecipientOrderByWithRelationInput | EmailRecipientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailRecipientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailRecipients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailRecipients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailRecipients
    **/
    _count?: true | EmailRecipientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailRecipientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailRecipientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailRecipientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailRecipientMaxAggregateInputType
  }

  export type GetEmailRecipientAggregateType<T extends EmailRecipientAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailRecipient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailRecipient[P]>
      : GetScalarType<T[P], AggregateEmailRecipient[P]>
  }




  export type EmailRecipientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailRecipientWhereInput
    orderBy?: EmailRecipientOrderByWithAggregationInput | EmailRecipientOrderByWithAggregationInput[]
    by: EmailRecipientScalarFieldEnum[] | EmailRecipientScalarFieldEnum
    having?: EmailRecipientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailRecipientCountAggregateInputType | true
    _avg?: EmailRecipientAvgAggregateInputType
    _sum?: EmailRecipientSumAggregateInputType
    _min?: EmailRecipientMinAggregateInputType
    _max?: EmailRecipientMaxAggregateInputType
  }

  export type EmailRecipientGroupByOutputType = {
    id: number
    campaignId: number
    email: string
    name: string | null
    company: string | null
    status: string
    messageId: string | null
    error: string | null
    sentAt: Date | null
    _count: EmailRecipientCountAggregateOutputType | null
    _avg: EmailRecipientAvgAggregateOutputType | null
    _sum: EmailRecipientSumAggregateOutputType | null
    _min: EmailRecipientMinAggregateOutputType | null
    _max: EmailRecipientMaxAggregateOutputType | null
  }

  type GetEmailRecipientGroupByPayload<T extends EmailRecipientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailRecipientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailRecipientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailRecipientGroupByOutputType[P]>
            : GetScalarType<T[P], EmailRecipientGroupByOutputType[P]>
        }
      >
    >


  export type EmailRecipientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    campaignId?: boolean
    email?: boolean
    name?: boolean
    company?: boolean
    status?: boolean
    messageId?: boolean
    error?: boolean
    sentAt?: boolean
    campaign?: boolean | EmailCampaignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailRecipient"]>



  export type EmailRecipientSelectScalar = {
    id?: boolean
    campaignId?: boolean
    email?: boolean
    name?: boolean
    company?: boolean
    status?: boolean
    messageId?: boolean
    error?: boolean
    sentAt?: boolean
  }

  export type EmailRecipientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "campaignId" | "email" | "name" | "company" | "status" | "messageId" | "error" | "sentAt", ExtArgs["result"]["emailRecipient"]>
  export type EmailRecipientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    campaign?: boolean | EmailCampaignDefaultArgs<ExtArgs>
  }

  export type $EmailRecipientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailRecipient"
    objects: {
      campaign: Prisma.$EmailCampaignPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      campaignId: number
      email: string
      name: string | null
      company: string | null
      status: string
      messageId: string | null
      error: string | null
      sentAt: Date | null
    }, ExtArgs["result"]["emailRecipient"]>
    composites: {}
  }

  type EmailRecipientGetPayload<S extends boolean | null | undefined | EmailRecipientDefaultArgs> = $Result.GetResult<Prisma.$EmailRecipientPayload, S>

  type EmailRecipientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailRecipientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailRecipientCountAggregateInputType | true
    }

  export interface EmailRecipientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailRecipient'], meta: { name: 'EmailRecipient' } }
    /**
     * Find zero or one EmailRecipient that matches the filter.
     * @param {EmailRecipientFindUniqueArgs} args - Arguments to find a EmailRecipient
     * @example
     * // Get one EmailRecipient
     * const emailRecipient = await prisma.emailRecipient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailRecipientFindUniqueArgs>(args: SelectSubset<T, EmailRecipientFindUniqueArgs<ExtArgs>>): Prisma__EmailRecipientClient<$Result.GetResult<Prisma.$EmailRecipientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailRecipient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailRecipientFindUniqueOrThrowArgs} args - Arguments to find a EmailRecipient
     * @example
     * // Get one EmailRecipient
     * const emailRecipient = await prisma.emailRecipient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailRecipientFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailRecipientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailRecipientClient<$Result.GetResult<Prisma.$EmailRecipientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailRecipient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailRecipientFindFirstArgs} args - Arguments to find a EmailRecipient
     * @example
     * // Get one EmailRecipient
     * const emailRecipient = await prisma.emailRecipient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailRecipientFindFirstArgs>(args?: SelectSubset<T, EmailRecipientFindFirstArgs<ExtArgs>>): Prisma__EmailRecipientClient<$Result.GetResult<Prisma.$EmailRecipientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailRecipient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailRecipientFindFirstOrThrowArgs} args - Arguments to find a EmailRecipient
     * @example
     * // Get one EmailRecipient
     * const emailRecipient = await prisma.emailRecipient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailRecipientFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailRecipientFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailRecipientClient<$Result.GetResult<Prisma.$EmailRecipientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailRecipients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailRecipientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailRecipients
     * const emailRecipients = await prisma.emailRecipient.findMany()
     * 
     * // Get first 10 EmailRecipients
     * const emailRecipients = await prisma.emailRecipient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailRecipientWithIdOnly = await prisma.emailRecipient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailRecipientFindManyArgs>(args?: SelectSubset<T, EmailRecipientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailRecipientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailRecipient.
     * @param {EmailRecipientCreateArgs} args - Arguments to create a EmailRecipient.
     * @example
     * // Create one EmailRecipient
     * const EmailRecipient = await prisma.emailRecipient.create({
     *   data: {
     *     // ... data to create a EmailRecipient
     *   }
     * })
     * 
     */
    create<T extends EmailRecipientCreateArgs>(args: SelectSubset<T, EmailRecipientCreateArgs<ExtArgs>>): Prisma__EmailRecipientClient<$Result.GetResult<Prisma.$EmailRecipientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailRecipients.
     * @param {EmailRecipientCreateManyArgs} args - Arguments to create many EmailRecipients.
     * @example
     * // Create many EmailRecipients
     * const emailRecipient = await prisma.emailRecipient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailRecipientCreateManyArgs>(args?: SelectSubset<T, EmailRecipientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EmailRecipient.
     * @param {EmailRecipientDeleteArgs} args - Arguments to delete one EmailRecipient.
     * @example
     * // Delete one EmailRecipient
     * const EmailRecipient = await prisma.emailRecipient.delete({
     *   where: {
     *     // ... filter to delete one EmailRecipient
     *   }
     * })
     * 
     */
    delete<T extends EmailRecipientDeleteArgs>(args: SelectSubset<T, EmailRecipientDeleteArgs<ExtArgs>>): Prisma__EmailRecipientClient<$Result.GetResult<Prisma.$EmailRecipientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailRecipient.
     * @param {EmailRecipientUpdateArgs} args - Arguments to update one EmailRecipient.
     * @example
     * // Update one EmailRecipient
     * const emailRecipient = await prisma.emailRecipient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailRecipientUpdateArgs>(args: SelectSubset<T, EmailRecipientUpdateArgs<ExtArgs>>): Prisma__EmailRecipientClient<$Result.GetResult<Prisma.$EmailRecipientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailRecipients.
     * @param {EmailRecipientDeleteManyArgs} args - Arguments to filter EmailRecipients to delete.
     * @example
     * // Delete a few EmailRecipients
     * const { count } = await prisma.emailRecipient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailRecipientDeleteManyArgs>(args?: SelectSubset<T, EmailRecipientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailRecipients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailRecipientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailRecipients
     * const emailRecipient = await prisma.emailRecipient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailRecipientUpdateManyArgs>(args: SelectSubset<T, EmailRecipientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmailRecipient.
     * @param {EmailRecipientUpsertArgs} args - Arguments to update or create a EmailRecipient.
     * @example
     * // Update or create a EmailRecipient
     * const emailRecipient = await prisma.emailRecipient.upsert({
     *   create: {
     *     // ... data to create a EmailRecipient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailRecipient we want to update
     *   }
     * })
     */
    upsert<T extends EmailRecipientUpsertArgs>(args: SelectSubset<T, EmailRecipientUpsertArgs<ExtArgs>>): Prisma__EmailRecipientClient<$Result.GetResult<Prisma.$EmailRecipientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailRecipients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailRecipientCountArgs} args - Arguments to filter EmailRecipients to count.
     * @example
     * // Count the number of EmailRecipients
     * const count = await prisma.emailRecipient.count({
     *   where: {
     *     // ... the filter for the EmailRecipients we want to count
     *   }
     * })
    **/
    count<T extends EmailRecipientCountArgs>(
      args?: Subset<T, EmailRecipientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailRecipientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailRecipient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailRecipientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailRecipientAggregateArgs>(args: Subset<T, EmailRecipientAggregateArgs>): Prisma.PrismaPromise<GetEmailRecipientAggregateType<T>>

    /**
     * Group by EmailRecipient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailRecipientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailRecipientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailRecipientGroupByArgs['orderBy'] }
        : { orderBy?: EmailRecipientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailRecipientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailRecipientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailRecipient model
   */
  readonly fields: EmailRecipientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailRecipient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailRecipientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    campaign<T extends EmailCampaignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmailCampaignDefaultArgs<ExtArgs>>): Prisma__EmailCampaignClient<$Result.GetResult<Prisma.$EmailCampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailRecipient model
   */
  interface EmailRecipientFieldRefs {
    readonly id: FieldRef<"EmailRecipient", 'Int'>
    readonly campaignId: FieldRef<"EmailRecipient", 'Int'>
    readonly email: FieldRef<"EmailRecipient", 'String'>
    readonly name: FieldRef<"EmailRecipient", 'String'>
    readonly company: FieldRef<"EmailRecipient", 'String'>
    readonly status: FieldRef<"EmailRecipient", 'String'>
    readonly messageId: FieldRef<"EmailRecipient", 'String'>
    readonly error: FieldRef<"EmailRecipient", 'String'>
    readonly sentAt: FieldRef<"EmailRecipient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailRecipient findUnique
   */
  export type EmailRecipientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailRecipient
     */
    select?: EmailRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailRecipient
     */
    omit?: EmailRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailRecipientInclude<ExtArgs> | null
    /**
     * Filter, which EmailRecipient to fetch.
     */
    where: EmailRecipientWhereUniqueInput
  }

  /**
   * EmailRecipient findUniqueOrThrow
   */
  export type EmailRecipientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailRecipient
     */
    select?: EmailRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailRecipient
     */
    omit?: EmailRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailRecipientInclude<ExtArgs> | null
    /**
     * Filter, which EmailRecipient to fetch.
     */
    where: EmailRecipientWhereUniqueInput
  }

  /**
   * EmailRecipient findFirst
   */
  export type EmailRecipientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailRecipient
     */
    select?: EmailRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailRecipient
     */
    omit?: EmailRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailRecipientInclude<ExtArgs> | null
    /**
     * Filter, which EmailRecipient to fetch.
     */
    where?: EmailRecipientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailRecipients to fetch.
     */
    orderBy?: EmailRecipientOrderByWithRelationInput | EmailRecipientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailRecipients.
     */
    cursor?: EmailRecipientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailRecipients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailRecipients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailRecipients.
     */
    distinct?: EmailRecipientScalarFieldEnum | EmailRecipientScalarFieldEnum[]
  }

  /**
   * EmailRecipient findFirstOrThrow
   */
  export type EmailRecipientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailRecipient
     */
    select?: EmailRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailRecipient
     */
    omit?: EmailRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailRecipientInclude<ExtArgs> | null
    /**
     * Filter, which EmailRecipient to fetch.
     */
    where?: EmailRecipientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailRecipients to fetch.
     */
    orderBy?: EmailRecipientOrderByWithRelationInput | EmailRecipientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailRecipients.
     */
    cursor?: EmailRecipientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailRecipients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailRecipients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailRecipients.
     */
    distinct?: EmailRecipientScalarFieldEnum | EmailRecipientScalarFieldEnum[]
  }

  /**
   * EmailRecipient findMany
   */
  export type EmailRecipientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailRecipient
     */
    select?: EmailRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailRecipient
     */
    omit?: EmailRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailRecipientInclude<ExtArgs> | null
    /**
     * Filter, which EmailRecipients to fetch.
     */
    where?: EmailRecipientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailRecipients to fetch.
     */
    orderBy?: EmailRecipientOrderByWithRelationInput | EmailRecipientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailRecipients.
     */
    cursor?: EmailRecipientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailRecipients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailRecipients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailRecipients.
     */
    distinct?: EmailRecipientScalarFieldEnum | EmailRecipientScalarFieldEnum[]
  }

  /**
   * EmailRecipient create
   */
  export type EmailRecipientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailRecipient
     */
    select?: EmailRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailRecipient
     */
    omit?: EmailRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailRecipientInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailRecipient.
     */
    data: XOR<EmailRecipientCreateInput, EmailRecipientUncheckedCreateInput>
  }

  /**
   * EmailRecipient createMany
   */
  export type EmailRecipientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailRecipients.
     */
    data: EmailRecipientCreateManyInput | EmailRecipientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailRecipient update
   */
  export type EmailRecipientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailRecipient
     */
    select?: EmailRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailRecipient
     */
    omit?: EmailRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailRecipientInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailRecipient.
     */
    data: XOR<EmailRecipientUpdateInput, EmailRecipientUncheckedUpdateInput>
    /**
     * Choose, which EmailRecipient to update.
     */
    where: EmailRecipientWhereUniqueInput
  }

  /**
   * EmailRecipient updateMany
   */
  export type EmailRecipientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailRecipients.
     */
    data: XOR<EmailRecipientUpdateManyMutationInput, EmailRecipientUncheckedUpdateManyInput>
    /**
     * Filter which EmailRecipients to update
     */
    where?: EmailRecipientWhereInput
    /**
     * Limit how many EmailRecipients to update.
     */
    limit?: number
  }

  /**
   * EmailRecipient upsert
   */
  export type EmailRecipientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailRecipient
     */
    select?: EmailRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailRecipient
     */
    omit?: EmailRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailRecipientInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailRecipient to update in case it exists.
     */
    where: EmailRecipientWhereUniqueInput
    /**
     * In case the EmailRecipient found by the `where` argument doesn't exist, create a new EmailRecipient with this data.
     */
    create: XOR<EmailRecipientCreateInput, EmailRecipientUncheckedCreateInput>
    /**
     * In case the EmailRecipient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailRecipientUpdateInput, EmailRecipientUncheckedUpdateInput>
  }

  /**
   * EmailRecipient delete
   */
  export type EmailRecipientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailRecipient
     */
    select?: EmailRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailRecipient
     */
    omit?: EmailRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailRecipientInclude<ExtArgs> | null
    /**
     * Filter which EmailRecipient to delete.
     */
    where: EmailRecipientWhereUniqueInput
  }

  /**
   * EmailRecipient deleteMany
   */
  export type EmailRecipientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailRecipients to delete
     */
    where?: EmailRecipientWhereInput
    /**
     * Limit how many EmailRecipients to delete.
     */
    limit?: number
  }

  /**
   * EmailRecipient without action
   */
  export type EmailRecipientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailRecipient
     */
    select?: EmailRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailRecipient
     */
    omit?: EmailRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailRecipientInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrganizerScalarFieldEnum: {
    id: 'id',
    companyName: 'companyName',
    contactName: 'contactName',
    phone: 'phone',
    email: 'email',
    website: 'website',
    facebook: 'facebook',
    note: 'note',
    outreachStatus: 'outreachStatus',
    lockedFields: 'lockedFields',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizerScalarFieldEnum = (typeof OrganizerScalarFieldEnum)[keyof typeof OrganizerScalarFieldEnum]


  export const ContactActivityScalarFieldEnum: {
    id: 'id',
    organizerId: 'organizerId',
    type: 'type',
    text: 'text',
    createdAt: 'createdAt'
  };

  export type ContactActivityScalarFieldEnum = (typeof ContactActivityScalarFieldEnum)[keyof typeof ContactActivityScalarFieldEnum]


  export const VenueScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    website: 'website',
    location: 'location',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VenueScalarFieldEnum = (typeof VenueScalarFieldEnum)[keyof typeof VenueScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    source: 'source',
    sourceUrl: 'sourceUrl',
    category: 'category',
    hall: 'hall',
    imageUrl: 'imageUrl',
    organizerName: 'organizerName',
    organizerContactName: 'organizerContactName',
    organizerPhone: 'organizerPhone',
    organizerEmail: 'organizerEmail',
    organizerWebsite: 'organizerWebsite',
    organizerFacebook: 'organizerFacebook',
    outreachStatus: 'outreachStatus',
    organizerId: 'organizerId',
    startsAt: 'startsAt',
    endsAt: 'endsAt',
    venueId: 'venueId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const LeadScalarFieldEnum: {
    id: 'id',
    companyName: 'companyName',
    contactName: 'contactName',
    phone: 'phone',
    email: 'email',
    status: 'status',
    priority: 'priority',
    note: 'note',
    eventId: 'eventId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    title: 'title',
    dueAt: 'dueAt',
    done: 'done',
    createdAt: 'createdAt'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const EmailTemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    subject: 'subject',
    body: 'body',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmailTemplateScalarFieldEnum = (typeof EmailTemplateScalarFieldEnum)[keyof typeof EmailTemplateScalarFieldEnum]


  export const EmailCampaignScalarFieldEnum: {
    id: 'id',
    name: 'name',
    templateId: 'templateId',
    subject: 'subject',
    body: 'body',
    status: 'status',
    sentAt: 'sentAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmailCampaignScalarFieldEnum = (typeof EmailCampaignScalarFieldEnum)[keyof typeof EmailCampaignScalarFieldEnum]


  export const EmailRecipientScalarFieldEnum: {
    id: 'id',
    campaignId: 'campaignId',
    email: 'email',
    name: 'name',
    company: 'company',
    status: 'status',
    messageId: 'messageId',
    error: 'error',
    sentAt: 'sentAt'
  };

  export type EmailRecipientScalarFieldEnum = (typeof EmailRecipientScalarFieldEnum)[keyof typeof EmailRecipientScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const OrganizerOrderByRelevanceFieldEnum: {
    companyName: 'companyName',
    contactName: 'contactName',
    phone: 'phone',
    email: 'email',
    website: 'website',
    facebook: 'facebook',
    note: 'note',
    outreachStatus: 'outreachStatus'
  };

  export type OrganizerOrderByRelevanceFieldEnum = (typeof OrganizerOrderByRelevanceFieldEnum)[keyof typeof OrganizerOrderByRelevanceFieldEnum]


  export const ContactActivityOrderByRelevanceFieldEnum: {
    type: 'type',
    text: 'text'
  };

  export type ContactActivityOrderByRelevanceFieldEnum = (typeof ContactActivityOrderByRelevanceFieldEnum)[keyof typeof ContactActivityOrderByRelevanceFieldEnum]


  export const VenueOrderByRelevanceFieldEnum: {
    name: 'name',
    slug: 'slug',
    website: 'website',
    location: 'location'
  };

  export type VenueOrderByRelevanceFieldEnum = (typeof VenueOrderByRelevanceFieldEnum)[keyof typeof VenueOrderByRelevanceFieldEnum]


  export const EventOrderByRelevanceFieldEnum: {
    title: 'title',
    sourceUrl: 'sourceUrl',
    category: 'category',
    hall: 'hall',
    imageUrl: 'imageUrl',
    organizerName: 'organizerName',
    organizerContactName: 'organizerContactName',
    organizerPhone: 'organizerPhone',
    organizerEmail: 'organizerEmail',
    organizerWebsite: 'organizerWebsite',
    organizerFacebook: 'organizerFacebook',
    outreachStatus: 'outreachStatus'
  };

  export type EventOrderByRelevanceFieldEnum = (typeof EventOrderByRelevanceFieldEnum)[keyof typeof EventOrderByRelevanceFieldEnum]


  export const LeadOrderByRelevanceFieldEnum: {
    companyName: 'companyName',
    contactName: 'contactName',
    phone: 'phone',
    email: 'email',
    note: 'note'
  };

  export type LeadOrderByRelevanceFieldEnum = (typeof LeadOrderByRelevanceFieldEnum)[keyof typeof LeadOrderByRelevanceFieldEnum]


  export const ActivityOrderByRelevanceFieldEnum: {
    title: 'title'
  };

  export type ActivityOrderByRelevanceFieldEnum = (typeof ActivityOrderByRelevanceFieldEnum)[keyof typeof ActivityOrderByRelevanceFieldEnum]


  export const EmailTemplateOrderByRelevanceFieldEnum: {
    name: 'name',
    subject: 'subject',
    body: 'body'
  };

  export type EmailTemplateOrderByRelevanceFieldEnum = (typeof EmailTemplateOrderByRelevanceFieldEnum)[keyof typeof EmailTemplateOrderByRelevanceFieldEnum]


  export const EmailCampaignOrderByRelevanceFieldEnum: {
    name: 'name',
    subject: 'subject',
    body: 'body',
    status: 'status'
  };

  export type EmailCampaignOrderByRelevanceFieldEnum = (typeof EmailCampaignOrderByRelevanceFieldEnum)[keyof typeof EmailCampaignOrderByRelevanceFieldEnum]


  export const EmailRecipientOrderByRelevanceFieldEnum: {
    email: 'email',
    name: 'name',
    company: 'company',
    status: 'status',
    messageId: 'messageId',
    error: 'error'
  };

  export type EmailRecipientOrderByRelevanceFieldEnum = (typeof EmailRecipientOrderByRelevanceFieldEnum)[keyof typeof EmailRecipientOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'EventSource'
   */
  export type EnumEventSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventSource'>
    


  /**
   * Reference to a field of type 'LeadStatus'
   */
  export type EnumLeadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadStatus'>
    


  /**
   * Reference to a field of type 'LeadPriority'
   */
  export type EnumLeadPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadPriority'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type OrganizerWhereInput = {
    AND?: OrganizerWhereInput | OrganizerWhereInput[]
    OR?: OrganizerWhereInput[]
    NOT?: OrganizerWhereInput | OrganizerWhereInput[]
    id?: IntFilter<"Organizer"> | number
    companyName?: StringFilter<"Organizer"> | string
    contactName?: StringNullableFilter<"Organizer"> | string | null
    phone?: StringNullableFilter<"Organizer"> | string | null
    email?: StringNullableFilter<"Organizer"> | string | null
    website?: StringNullableFilter<"Organizer"> | string | null
    facebook?: StringNullableFilter<"Organizer"> | string | null
    note?: StringNullableFilter<"Organizer"> | string | null
    outreachStatus?: StringFilter<"Organizer"> | string
    lockedFields?: JsonFilter<"Organizer">
    createdAt?: DateTimeFilter<"Organizer"> | Date | string
    updatedAt?: DateTimeFilter<"Organizer"> | Date | string
    events?: EventListRelationFilter
    activities?: ContactActivityListRelationFilter
  }

  export type OrganizerOrderByWithRelationInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    facebook?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    outreachStatus?: SortOrder
    lockedFields?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    events?: EventOrderByRelationAggregateInput
    activities?: ContactActivityOrderByRelationAggregateInput
    _relevance?: OrganizerOrderByRelevanceInput
  }

  export type OrganizerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrganizerWhereInput | OrganizerWhereInput[]
    OR?: OrganizerWhereInput[]
    NOT?: OrganizerWhereInput | OrganizerWhereInput[]
    companyName?: StringFilter<"Organizer"> | string
    contactName?: StringNullableFilter<"Organizer"> | string | null
    phone?: StringNullableFilter<"Organizer"> | string | null
    email?: StringNullableFilter<"Organizer"> | string | null
    website?: StringNullableFilter<"Organizer"> | string | null
    facebook?: StringNullableFilter<"Organizer"> | string | null
    note?: StringNullableFilter<"Organizer"> | string | null
    outreachStatus?: StringFilter<"Organizer"> | string
    lockedFields?: JsonFilter<"Organizer">
    createdAt?: DateTimeFilter<"Organizer"> | Date | string
    updatedAt?: DateTimeFilter<"Organizer"> | Date | string
    events?: EventListRelationFilter
    activities?: ContactActivityListRelationFilter
  }, "id">

  export type OrganizerOrderByWithAggregationInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    facebook?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    outreachStatus?: SortOrder
    lockedFields?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrganizerCountOrderByAggregateInput
    _avg?: OrganizerAvgOrderByAggregateInput
    _max?: OrganizerMaxOrderByAggregateInput
    _min?: OrganizerMinOrderByAggregateInput
    _sum?: OrganizerSumOrderByAggregateInput
  }

  export type OrganizerScalarWhereWithAggregatesInput = {
    AND?: OrganizerScalarWhereWithAggregatesInput | OrganizerScalarWhereWithAggregatesInput[]
    OR?: OrganizerScalarWhereWithAggregatesInput[]
    NOT?: OrganizerScalarWhereWithAggregatesInput | OrganizerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Organizer"> | number
    companyName?: StringWithAggregatesFilter<"Organizer"> | string
    contactName?: StringNullableWithAggregatesFilter<"Organizer"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Organizer"> | string | null
    email?: StringNullableWithAggregatesFilter<"Organizer"> | string | null
    website?: StringNullableWithAggregatesFilter<"Organizer"> | string | null
    facebook?: StringNullableWithAggregatesFilter<"Organizer"> | string | null
    note?: StringNullableWithAggregatesFilter<"Organizer"> | string | null
    outreachStatus?: StringWithAggregatesFilter<"Organizer"> | string
    lockedFields?: JsonWithAggregatesFilter<"Organizer">
    createdAt?: DateTimeWithAggregatesFilter<"Organizer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organizer"> | Date | string
  }

  export type ContactActivityWhereInput = {
    AND?: ContactActivityWhereInput | ContactActivityWhereInput[]
    OR?: ContactActivityWhereInput[]
    NOT?: ContactActivityWhereInput | ContactActivityWhereInput[]
    id?: IntFilter<"ContactActivity"> | number
    organizerId?: IntFilter<"ContactActivity"> | number
    type?: StringFilter<"ContactActivity"> | string
    text?: StringFilter<"ContactActivity"> | string
    createdAt?: DateTimeFilter<"ContactActivity"> | Date | string
    organizer?: XOR<OrganizerScalarRelationFilter, OrganizerWhereInput>
  }

  export type ContactActivityOrderByWithRelationInput = {
    id?: SortOrder
    organizerId?: SortOrder
    type?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    organizer?: OrganizerOrderByWithRelationInput
    _relevance?: ContactActivityOrderByRelevanceInput
  }

  export type ContactActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ContactActivityWhereInput | ContactActivityWhereInput[]
    OR?: ContactActivityWhereInput[]
    NOT?: ContactActivityWhereInput | ContactActivityWhereInput[]
    organizerId?: IntFilter<"ContactActivity"> | number
    type?: StringFilter<"ContactActivity"> | string
    text?: StringFilter<"ContactActivity"> | string
    createdAt?: DateTimeFilter<"ContactActivity"> | Date | string
    organizer?: XOR<OrganizerScalarRelationFilter, OrganizerWhereInput>
  }, "id">

  export type ContactActivityOrderByWithAggregationInput = {
    id?: SortOrder
    organizerId?: SortOrder
    type?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    _count?: ContactActivityCountOrderByAggregateInput
    _avg?: ContactActivityAvgOrderByAggregateInput
    _max?: ContactActivityMaxOrderByAggregateInput
    _min?: ContactActivityMinOrderByAggregateInput
    _sum?: ContactActivitySumOrderByAggregateInput
  }

  export type ContactActivityScalarWhereWithAggregatesInput = {
    AND?: ContactActivityScalarWhereWithAggregatesInput | ContactActivityScalarWhereWithAggregatesInput[]
    OR?: ContactActivityScalarWhereWithAggregatesInput[]
    NOT?: ContactActivityScalarWhereWithAggregatesInput | ContactActivityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ContactActivity"> | number
    organizerId?: IntWithAggregatesFilter<"ContactActivity"> | number
    type?: StringWithAggregatesFilter<"ContactActivity"> | string
    text?: StringWithAggregatesFilter<"ContactActivity"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ContactActivity"> | Date | string
  }

  export type VenueWhereInput = {
    AND?: VenueWhereInput | VenueWhereInput[]
    OR?: VenueWhereInput[]
    NOT?: VenueWhereInput | VenueWhereInput[]
    id?: IntFilter<"Venue"> | number
    name?: StringFilter<"Venue"> | string
    slug?: StringFilter<"Venue"> | string
    website?: StringNullableFilter<"Venue"> | string | null
    location?: StringNullableFilter<"Venue"> | string | null
    createdAt?: DateTimeFilter<"Venue"> | Date | string
    updatedAt?: DateTimeFilter<"Venue"> | Date | string
    events?: EventListRelationFilter
  }

  export type VenueOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    website?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    events?: EventOrderByRelationAggregateInput
    _relevance?: VenueOrderByRelevanceInput
  }

  export type VenueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: VenueWhereInput | VenueWhereInput[]
    OR?: VenueWhereInput[]
    NOT?: VenueWhereInput | VenueWhereInput[]
    name?: StringFilter<"Venue"> | string
    website?: StringNullableFilter<"Venue"> | string | null
    location?: StringNullableFilter<"Venue"> | string | null
    createdAt?: DateTimeFilter<"Venue"> | Date | string
    updatedAt?: DateTimeFilter<"Venue"> | Date | string
    events?: EventListRelationFilter
  }, "id" | "slug">

  export type VenueOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    website?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VenueCountOrderByAggregateInput
    _avg?: VenueAvgOrderByAggregateInput
    _max?: VenueMaxOrderByAggregateInput
    _min?: VenueMinOrderByAggregateInput
    _sum?: VenueSumOrderByAggregateInput
  }

  export type VenueScalarWhereWithAggregatesInput = {
    AND?: VenueScalarWhereWithAggregatesInput | VenueScalarWhereWithAggregatesInput[]
    OR?: VenueScalarWhereWithAggregatesInput[]
    NOT?: VenueScalarWhereWithAggregatesInput | VenueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Venue"> | number
    name?: StringWithAggregatesFilter<"Venue"> | string
    slug?: StringWithAggregatesFilter<"Venue"> | string
    website?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    location?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Venue"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Venue"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: IntFilter<"Event"> | number
    title?: StringFilter<"Event"> | string
    source?: EnumEventSourceFilter<"Event"> | $Enums.EventSource
    sourceUrl?: StringNullableFilter<"Event"> | string | null
    category?: StringNullableFilter<"Event"> | string | null
    hall?: StringNullableFilter<"Event"> | string | null
    imageUrl?: StringNullableFilter<"Event"> | string | null
    organizerName?: StringNullableFilter<"Event"> | string | null
    organizerContactName?: StringNullableFilter<"Event"> | string | null
    organizerPhone?: StringNullableFilter<"Event"> | string | null
    organizerEmail?: StringNullableFilter<"Event"> | string | null
    organizerWebsite?: StringNullableFilter<"Event"> | string | null
    organizerFacebook?: StringNullableFilter<"Event"> | string | null
    outreachStatus?: StringFilter<"Event"> | string
    organizerId?: IntNullableFilter<"Event"> | number | null
    startsAt?: DateTimeFilter<"Event"> | Date | string
    endsAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    venueId?: IntFilter<"Event"> | number
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    organizer?: XOR<OrganizerNullableScalarRelationFilter, OrganizerWhereInput> | null
    venue?: XOR<VenueScalarRelationFilter, VenueWhereInput>
    leads?: LeadListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    hall?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    organizerName?: SortOrderInput | SortOrder
    organizerContactName?: SortOrderInput | SortOrder
    organizerPhone?: SortOrderInput | SortOrder
    organizerEmail?: SortOrderInput | SortOrder
    organizerWebsite?: SortOrderInput | SortOrder
    organizerFacebook?: SortOrderInput | SortOrder
    outreachStatus?: SortOrder
    organizerId?: SortOrderInput | SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrderInput | SortOrder
    venueId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizer?: OrganizerOrderByWithRelationInput
    venue?: VenueOrderByWithRelationInput
    leads?: LeadOrderByRelationAggregateInput
    _relevance?: EventOrderByRelevanceInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    title_startsAt_venueId?: EventTitleStartsAtVenueIdCompoundUniqueInput
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    title?: StringFilter<"Event"> | string
    source?: EnumEventSourceFilter<"Event"> | $Enums.EventSource
    sourceUrl?: StringNullableFilter<"Event"> | string | null
    category?: StringNullableFilter<"Event"> | string | null
    hall?: StringNullableFilter<"Event"> | string | null
    imageUrl?: StringNullableFilter<"Event"> | string | null
    organizerName?: StringNullableFilter<"Event"> | string | null
    organizerContactName?: StringNullableFilter<"Event"> | string | null
    organizerPhone?: StringNullableFilter<"Event"> | string | null
    organizerEmail?: StringNullableFilter<"Event"> | string | null
    organizerWebsite?: StringNullableFilter<"Event"> | string | null
    organizerFacebook?: StringNullableFilter<"Event"> | string | null
    outreachStatus?: StringFilter<"Event"> | string
    organizerId?: IntNullableFilter<"Event"> | number | null
    startsAt?: DateTimeFilter<"Event"> | Date | string
    endsAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    venueId?: IntFilter<"Event"> | number
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    organizer?: XOR<OrganizerNullableScalarRelationFilter, OrganizerWhereInput> | null
    venue?: XOR<VenueScalarRelationFilter, VenueWhereInput>
    leads?: LeadListRelationFilter
  }, "id" | "title_startsAt_venueId">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    hall?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    organizerName?: SortOrderInput | SortOrder
    organizerContactName?: SortOrderInput | SortOrder
    organizerPhone?: SortOrderInput | SortOrder
    organizerEmail?: SortOrderInput | SortOrder
    organizerWebsite?: SortOrderInput | SortOrder
    organizerFacebook?: SortOrderInput | SortOrder
    outreachStatus?: SortOrder
    organizerId?: SortOrderInput | SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrderInput | SortOrder
    venueId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Event"> | number
    title?: StringWithAggregatesFilter<"Event"> | string
    source?: EnumEventSourceWithAggregatesFilter<"Event"> | $Enums.EventSource
    sourceUrl?: StringNullableWithAggregatesFilter<"Event"> | string | null
    category?: StringNullableWithAggregatesFilter<"Event"> | string | null
    hall?: StringNullableWithAggregatesFilter<"Event"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Event"> | string | null
    organizerName?: StringNullableWithAggregatesFilter<"Event"> | string | null
    organizerContactName?: StringNullableWithAggregatesFilter<"Event"> | string | null
    organizerPhone?: StringNullableWithAggregatesFilter<"Event"> | string | null
    organizerEmail?: StringNullableWithAggregatesFilter<"Event"> | string | null
    organizerWebsite?: StringNullableWithAggregatesFilter<"Event"> | string | null
    organizerFacebook?: StringNullableWithAggregatesFilter<"Event"> | string | null
    outreachStatus?: StringWithAggregatesFilter<"Event"> | string
    organizerId?: IntNullableWithAggregatesFilter<"Event"> | number | null
    startsAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    endsAt?: DateTimeNullableWithAggregatesFilter<"Event"> | Date | string | null
    venueId?: IntWithAggregatesFilter<"Event"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: IntFilter<"Lead"> | number
    companyName?: StringFilter<"Lead"> | string
    contactName?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    status?: EnumLeadStatusFilter<"Lead"> | $Enums.LeadStatus
    priority?: EnumLeadPriorityFilter<"Lead"> | $Enums.LeadPriority
    note?: StringNullableFilter<"Lead"> | string | null
    eventId?: IntNullableFilter<"Lead"> | number | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    event?: XOR<EventNullableScalarRelationFilter, EventWhereInput> | null
    activities?: ActivityListRelationFilter
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    note?: SortOrderInput | SortOrder
    eventId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    event?: EventOrderByWithRelationInput
    activities?: ActivityOrderByRelationAggregateInput
    _relevance?: LeadOrderByRelevanceInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    companyName?: StringFilter<"Lead"> | string
    contactName?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    status?: EnumLeadStatusFilter<"Lead"> | $Enums.LeadStatus
    priority?: EnumLeadPriorityFilter<"Lead"> | $Enums.LeadPriority
    note?: StringNullableFilter<"Lead"> | string | null
    eventId?: IntNullableFilter<"Lead"> | number | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    event?: XOR<EventNullableScalarRelationFilter, EventWhereInput> | null
    activities?: ActivityListRelationFilter
  }, "id">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    note?: SortOrderInput | SortOrder
    eventId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeadCountOrderByAggregateInput
    _avg?: LeadAvgOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
    _sum?: LeadSumOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Lead"> | number
    companyName?: StringWithAggregatesFilter<"Lead"> | string
    contactName?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    email?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    status?: EnumLeadStatusWithAggregatesFilter<"Lead"> | $Enums.LeadStatus
    priority?: EnumLeadPriorityWithAggregatesFilter<"Lead"> | $Enums.LeadPriority
    note?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    eventId?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: IntFilter<"Activity"> | number
    leadId?: IntFilter<"Activity"> | number
    title?: StringFilter<"Activity"> | string
    dueAt?: DateTimeNullableFilter<"Activity"> | Date | string | null
    done?: BoolFilter<"Activity"> | boolean
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    dueAt?: SortOrderInput | SortOrder
    done?: SortOrder
    createdAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
    _relevance?: ActivityOrderByRelevanceInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    leadId?: IntFilter<"Activity"> | number
    title?: StringFilter<"Activity"> | string
    dueAt?: DateTimeNullableFilter<"Activity"> | Date | string | null
    done?: BoolFilter<"Activity"> | boolean
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    dueAt?: SortOrderInput | SortOrder
    done?: SortOrder
    createdAt?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _avg?: ActivityAvgOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
    _sum?: ActivitySumOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Activity"> | number
    leadId?: IntWithAggregatesFilter<"Activity"> | number
    title?: StringWithAggregatesFilter<"Activity"> | string
    dueAt?: DateTimeNullableWithAggregatesFilter<"Activity"> | Date | string | null
    done?: BoolWithAggregatesFilter<"Activity"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
  }

  export type EmailTemplateWhereInput = {
    AND?: EmailTemplateWhereInput | EmailTemplateWhereInput[]
    OR?: EmailTemplateWhereInput[]
    NOT?: EmailTemplateWhereInput | EmailTemplateWhereInput[]
    id?: IntFilter<"EmailTemplate"> | number
    name?: StringFilter<"EmailTemplate"> | string
    subject?: StringFilter<"EmailTemplate"> | string
    body?: StringFilter<"EmailTemplate"> | string
    createdAt?: DateTimeFilter<"EmailTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"EmailTemplate"> | Date | string
    campaigns?: EmailCampaignListRelationFilter
  }

  export type EmailTemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    campaigns?: EmailCampaignOrderByRelationAggregateInput
    _relevance?: EmailTemplateOrderByRelevanceInput
  }

  export type EmailTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EmailTemplateWhereInput | EmailTemplateWhereInput[]
    OR?: EmailTemplateWhereInput[]
    NOT?: EmailTemplateWhereInput | EmailTemplateWhereInput[]
    name?: StringFilter<"EmailTemplate"> | string
    subject?: StringFilter<"EmailTemplate"> | string
    body?: StringFilter<"EmailTemplate"> | string
    createdAt?: DateTimeFilter<"EmailTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"EmailTemplate"> | Date | string
    campaigns?: EmailCampaignListRelationFilter
  }, "id">

  export type EmailTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmailTemplateCountOrderByAggregateInput
    _avg?: EmailTemplateAvgOrderByAggregateInput
    _max?: EmailTemplateMaxOrderByAggregateInput
    _min?: EmailTemplateMinOrderByAggregateInput
    _sum?: EmailTemplateSumOrderByAggregateInput
  }

  export type EmailTemplateScalarWhereWithAggregatesInput = {
    AND?: EmailTemplateScalarWhereWithAggregatesInput | EmailTemplateScalarWhereWithAggregatesInput[]
    OR?: EmailTemplateScalarWhereWithAggregatesInput[]
    NOT?: EmailTemplateScalarWhereWithAggregatesInput | EmailTemplateScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EmailTemplate"> | number
    name?: StringWithAggregatesFilter<"EmailTemplate"> | string
    subject?: StringWithAggregatesFilter<"EmailTemplate"> | string
    body?: StringWithAggregatesFilter<"EmailTemplate"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EmailTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmailTemplate"> | Date | string
  }

  export type EmailCampaignWhereInput = {
    AND?: EmailCampaignWhereInput | EmailCampaignWhereInput[]
    OR?: EmailCampaignWhereInput[]
    NOT?: EmailCampaignWhereInput | EmailCampaignWhereInput[]
    id?: IntFilter<"EmailCampaign"> | number
    name?: StringFilter<"EmailCampaign"> | string
    templateId?: IntFilter<"EmailCampaign"> | number
    subject?: StringFilter<"EmailCampaign"> | string
    body?: StringFilter<"EmailCampaign"> | string
    status?: StringFilter<"EmailCampaign"> | string
    sentAt?: DateTimeNullableFilter<"EmailCampaign"> | Date | string | null
    createdAt?: DateTimeFilter<"EmailCampaign"> | Date | string
    updatedAt?: DateTimeFilter<"EmailCampaign"> | Date | string
    template?: XOR<EmailTemplateScalarRelationFilter, EmailTemplateWhereInput>
    recipients?: EmailRecipientListRelationFilter
  }

  export type EmailCampaignOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    templateId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    status?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    template?: EmailTemplateOrderByWithRelationInput
    recipients?: EmailRecipientOrderByRelationAggregateInput
    _relevance?: EmailCampaignOrderByRelevanceInput
  }

  export type EmailCampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EmailCampaignWhereInput | EmailCampaignWhereInput[]
    OR?: EmailCampaignWhereInput[]
    NOT?: EmailCampaignWhereInput | EmailCampaignWhereInput[]
    name?: StringFilter<"EmailCampaign"> | string
    templateId?: IntFilter<"EmailCampaign"> | number
    subject?: StringFilter<"EmailCampaign"> | string
    body?: StringFilter<"EmailCampaign"> | string
    status?: StringFilter<"EmailCampaign"> | string
    sentAt?: DateTimeNullableFilter<"EmailCampaign"> | Date | string | null
    createdAt?: DateTimeFilter<"EmailCampaign"> | Date | string
    updatedAt?: DateTimeFilter<"EmailCampaign"> | Date | string
    template?: XOR<EmailTemplateScalarRelationFilter, EmailTemplateWhereInput>
    recipients?: EmailRecipientListRelationFilter
  }, "id">

  export type EmailCampaignOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    templateId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    status?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmailCampaignCountOrderByAggregateInput
    _avg?: EmailCampaignAvgOrderByAggregateInput
    _max?: EmailCampaignMaxOrderByAggregateInput
    _min?: EmailCampaignMinOrderByAggregateInput
    _sum?: EmailCampaignSumOrderByAggregateInput
  }

  export type EmailCampaignScalarWhereWithAggregatesInput = {
    AND?: EmailCampaignScalarWhereWithAggregatesInput | EmailCampaignScalarWhereWithAggregatesInput[]
    OR?: EmailCampaignScalarWhereWithAggregatesInput[]
    NOT?: EmailCampaignScalarWhereWithAggregatesInput | EmailCampaignScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EmailCampaign"> | number
    name?: StringWithAggregatesFilter<"EmailCampaign"> | string
    templateId?: IntWithAggregatesFilter<"EmailCampaign"> | number
    subject?: StringWithAggregatesFilter<"EmailCampaign"> | string
    body?: StringWithAggregatesFilter<"EmailCampaign"> | string
    status?: StringWithAggregatesFilter<"EmailCampaign"> | string
    sentAt?: DateTimeNullableWithAggregatesFilter<"EmailCampaign"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EmailCampaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmailCampaign"> | Date | string
  }

  export type EmailRecipientWhereInput = {
    AND?: EmailRecipientWhereInput | EmailRecipientWhereInput[]
    OR?: EmailRecipientWhereInput[]
    NOT?: EmailRecipientWhereInput | EmailRecipientWhereInput[]
    id?: IntFilter<"EmailRecipient"> | number
    campaignId?: IntFilter<"EmailRecipient"> | number
    email?: StringFilter<"EmailRecipient"> | string
    name?: StringNullableFilter<"EmailRecipient"> | string | null
    company?: StringNullableFilter<"EmailRecipient"> | string | null
    status?: StringFilter<"EmailRecipient"> | string
    messageId?: StringNullableFilter<"EmailRecipient"> | string | null
    error?: StringNullableFilter<"EmailRecipient"> | string | null
    sentAt?: DateTimeNullableFilter<"EmailRecipient"> | Date | string | null
    campaign?: XOR<EmailCampaignScalarRelationFilter, EmailCampaignWhereInput>
  }

  export type EmailRecipientOrderByWithRelationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    status?: SortOrder
    messageId?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    campaign?: EmailCampaignOrderByWithRelationInput
    _relevance?: EmailRecipientOrderByRelevanceInput
  }

  export type EmailRecipientWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EmailRecipientWhereInput | EmailRecipientWhereInput[]
    OR?: EmailRecipientWhereInput[]
    NOT?: EmailRecipientWhereInput | EmailRecipientWhereInput[]
    campaignId?: IntFilter<"EmailRecipient"> | number
    email?: StringFilter<"EmailRecipient"> | string
    name?: StringNullableFilter<"EmailRecipient"> | string | null
    company?: StringNullableFilter<"EmailRecipient"> | string | null
    status?: StringFilter<"EmailRecipient"> | string
    messageId?: StringNullableFilter<"EmailRecipient"> | string | null
    error?: StringNullableFilter<"EmailRecipient"> | string | null
    sentAt?: DateTimeNullableFilter<"EmailRecipient"> | Date | string | null
    campaign?: XOR<EmailCampaignScalarRelationFilter, EmailCampaignWhereInput>
  }, "id">

  export type EmailRecipientOrderByWithAggregationInput = {
    id?: SortOrder
    campaignId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    status?: SortOrder
    messageId?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    _count?: EmailRecipientCountOrderByAggregateInput
    _avg?: EmailRecipientAvgOrderByAggregateInput
    _max?: EmailRecipientMaxOrderByAggregateInput
    _min?: EmailRecipientMinOrderByAggregateInput
    _sum?: EmailRecipientSumOrderByAggregateInput
  }

  export type EmailRecipientScalarWhereWithAggregatesInput = {
    AND?: EmailRecipientScalarWhereWithAggregatesInput | EmailRecipientScalarWhereWithAggregatesInput[]
    OR?: EmailRecipientScalarWhereWithAggregatesInput[]
    NOT?: EmailRecipientScalarWhereWithAggregatesInput | EmailRecipientScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EmailRecipient"> | number
    campaignId?: IntWithAggregatesFilter<"EmailRecipient"> | number
    email?: StringWithAggregatesFilter<"EmailRecipient"> | string
    name?: StringNullableWithAggregatesFilter<"EmailRecipient"> | string | null
    company?: StringNullableWithAggregatesFilter<"EmailRecipient"> | string | null
    status?: StringWithAggregatesFilter<"EmailRecipient"> | string
    messageId?: StringNullableWithAggregatesFilter<"EmailRecipient"> | string | null
    error?: StringNullableWithAggregatesFilter<"EmailRecipient"> | string | null
    sentAt?: DateTimeNullableWithAggregatesFilter<"EmailRecipient"> | Date | string | null
  }

  export type OrganizerCreateInput = {
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    facebook?: string | null
    note?: string | null
    outreachStatus?: string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutOrganizerInput
    activities?: ContactActivityCreateNestedManyWithoutOrganizerInput
  }

  export type OrganizerUncheckedCreateInput = {
    id?: number
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    facebook?: string | null
    note?: string | null
    outreachStatus?: string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutOrganizerInput
    activities?: ContactActivityUncheckedCreateNestedManyWithoutOrganizerInput
  }

  export type OrganizerUpdateInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutOrganizerNestedInput
    activities?: ContactActivityUpdateManyWithoutOrganizerNestedInput
  }

  export type OrganizerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutOrganizerNestedInput
    activities?: ContactActivityUncheckedUpdateManyWithoutOrganizerNestedInput
  }

  export type OrganizerCreateManyInput = {
    id?: number
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    facebook?: string | null
    note?: string | null
    outreachStatus?: string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizerUpdateManyMutationInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactActivityCreateInput = {
    type?: string
    text: string
    createdAt?: Date | string
    organizer: OrganizerCreateNestedOneWithoutActivitiesInput
  }

  export type ContactActivityUncheckedCreateInput = {
    id?: number
    organizerId: number
    type?: string
    text: string
    createdAt?: Date | string
  }

  export type ContactActivityUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: OrganizerUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ContactActivityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    organizerId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactActivityCreateManyInput = {
    id?: number
    organizerId: number
    type?: string
    text: string
    createdAt?: Date | string
  }

  export type ContactActivityUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactActivityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    organizerId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueCreateInput = {
    name: string
    slug: string
    website?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutVenueInput
  }

  export type VenueUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    website?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutVenueInput
  }

  export type VenueUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutVenueNestedInput
  }

  export type VenueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutVenueNestedInput
  }

  export type VenueCreateManyInput = {
    id?: number
    name: string
    slug: string
    website?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VenueUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    title: string
    source: $Enums.EventSource
    sourceUrl?: string | null
    category?: string | null
    hall?: string | null
    imageUrl?: string | null
    organizerName?: string | null
    organizerContactName?: string | null
    organizerPhone?: string | null
    organizerEmail?: string | null
    organizerWebsite?: string | null
    organizerFacebook?: string | null
    outreachStatus?: string
    startsAt: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer?: OrganizerCreateNestedOneWithoutEventsInput
    venue: VenueCreateNestedOneWithoutEventsInput
    leads?: LeadCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: number
    title: string
    source: $Enums.EventSource
    sourceUrl?: string | null
    category?: string | null
    hall?: string | null
    imageUrl?: string | null
    organizerName?: string | null
    organizerContactName?: string | null
    organizerPhone?: string | null
    organizerEmail?: string | null
    organizerWebsite?: string | null
    organizerFacebook?: string | null
    outreachStatus?: string
    organizerId?: number | null
    startsAt: Date | string
    endsAt?: Date | string | null
    venueId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: OrganizerUpdateOneWithoutEventsNestedInput
    venue?: VenueUpdateOneRequiredWithoutEventsNestedInput
    leads?: LeadUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    organizerId?: NullableIntFieldUpdateOperationsInput | number | null
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venueId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: number
    title: string
    source: $Enums.EventSource
    sourceUrl?: string | null
    category?: string | null
    hall?: string | null
    imageUrl?: string | null
    organizerName?: string | null
    organizerContactName?: string | null
    organizerPhone?: string | null
    organizerEmail?: string | null
    organizerWebsite?: string | null
    organizerFacebook?: string | null
    outreachStatus?: string
    organizerId?: number | null
    startsAt: Date | string
    endsAt?: Date | string | null
    venueId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    organizerId?: NullableIntFieldUpdateOperationsInput | number | null
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venueId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateInput = {
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    status?: $Enums.LeadStatus
    priority?: $Enums.LeadPriority
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event?: EventCreateNestedOneWithoutLeadsInput
    activities?: ActivityCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateInput = {
    id?: number
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    status?: $Enums.LeadStatus
    priority?: $Enums.LeadPriority
    note?: string | null
    eventId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadUpdateInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    priority?: EnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneWithoutLeadsNestedInput
    activities?: ActivityUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    priority?: EnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority
    note?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateManyInput = {
    id?: number
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    status?: $Enums.LeadStatus
    priority?: $Enums.LeadPriority
    note?: string | null
    eventId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUpdateManyMutationInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    priority?: EnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    priority?: EnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority
    note?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateInput = {
    title: string
    dueAt?: Date | string | null
    done?: boolean
    createdAt?: Date | string
    lead: LeadCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: number
    leadId: number
    title: string
    dueAt?: Date | string | null
    done?: boolean
    createdAt?: Date | string
  }

  export type ActivityUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    leadId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateManyInput = {
    id?: number
    leadId: number
    title: string
    dueAt?: Date | string | null
    done?: boolean
    createdAt?: Date | string
  }

  export type ActivityUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    leadId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailTemplateCreateInput = {
    name: string
    subject: string
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
    campaigns?: EmailCampaignCreateNestedManyWithoutTemplateInput
  }

  export type EmailTemplateUncheckedCreateInput = {
    id?: number
    name: string
    subject: string
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
    campaigns?: EmailCampaignUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type EmailTemplateUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaigns?: EmailCampaignUpdateManyWithoutTemplateNestedInput
  }

  export type EmailTemplateUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    campaigns?: EmailCampaignUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type EmailTemplateCreateManyInput = {
    id?: number
    name: string
    subject: string
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailTemplateUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailTemplateUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailCampaignCreateInput = {
    name: string
    subject: string
    body: string
    status?: string
    sentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    template: EmailTemplateCreateNestedOneWithoutCampaignsInput
    recipients?: EmailRecipientCreateNestedManyWithoutCampaignInput
  }

  export type EmailCampaignUncheckedCreateInput = {
    id?: number
    name: string
    templateId: number
    subject: string
    body: string
    status?: string
    sentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipients?: EmailRecipientUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type EmailCampaignUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: EmailTemplateUpdateOneRequiredWithoutCampaignsNestedInput
    recipients?: EmailRecipientUpdateManyWithoutCampaignNestedInput
  }

  export type EmailCampaignUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    templateId?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipients?: EmailRecipientUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type EmailCampaignCreateManyInput = {
    id?: number
    name: string
    templateId: number
    subject: string
    body: string
    status?: string
    sentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailCampaignUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailCampaignUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    templateId?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailRecipientCreateInput = {
    email: string
    name?: string | null
    company?: string | null
    status?: string
    messageId?: string | null
    error?: string | null
    sentAt?: Date | string | null
    campaign: EmailCampaignCreateNestedOneWithoutRecipientsInput
  }

  export type EmailRecipientUncheckedCreateInput = {
    id?: number
    campaignId: number
    email: string
    name?: string | null
    company?: string | null
    status?: string
    messageId?: string | null
    error?: string | null
    sentAt?: Date | string | null
  }

  export type EmailRecipientUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    campaign?: EmailCampaignUpdateOneRequiredWithoutRecipientsNestedInput
  }

  export type EmailRecipientUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    campaignId?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EmailRecipientCreateManyInput = {
    id?: number
    campaignId: number
    email: string
    name?: string | null
    company?: string | null
    status?: string
    messageId?: string | null
    error?: string | null
    sentAt?: Date | string | null
  }

  export type EmailRecipientUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EmailRecipientUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    campaignId?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type ContactActivityListRelationFilter = {
    every?: ContactActivityWhereInput
    some?: ContactActivityWhereInput
    none?: ContactActivityWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizerOrderByRelevanceInput = {
    fields: OrganizerOrderByRelevanceFieldEnum | OrganizerOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrganizerCountOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    facebook?: SortOrder
    note?: SortOrder
    outreachStatus?: SortOrder
    lockedFields?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OrganizerMaxOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    facebook?: SortOrder
    note?: SortOrder
    outreachStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizerMinOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    facebook?: SortOrder
    note?: SortOrder
    outreachStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type OrganizerScalarRelationFilter = {
    is?: OrganizerWhereInput
    isNot?: OrganizerWhereInput
  }

  export type ContactActivityOrderByRelevanceInput = {
    fields: ContactActivityOrderByRelevanceFieldEnum | ContactActivityOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ContactActivityCountOrderByAggregateInput = {
    id?: SortOrder
    organizerId?: SortOrder
    type?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactActivityAvgOrderByAggregateInput = {
    id?: SortOrder
    organizerId?: SortOrder
  }

  export type ContactActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    organizerId?: SortOrder
    type?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactActivityMinOrderByAggregateInput = {
    id?: SortOrder
    organizerId?: SortOrder
    type?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactActivitySumOrderByAggregateInput = {
    id?: SortOrder
    organizerId?: SortOrder
  }

  export type VenueOrderByRelevanceInput = {
    fields: VenueOrderByRelevanceFieldEnum | VenueOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VenueCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    website?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VenueMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    website?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    website?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumEventSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.EventSource | EnumEventSourceFieldRefInput<$PrismaModel>
    in?: $Enums.EventSource[]
    notIn?: $Enums.EventSource[]
    not?: NestedEnumEventSourceFilter<$PrismaModel> | $Enums.EventSource
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OrganizerNullableScalarRelationFilter = {
    is?: OrganizerWhereInput | null
    isNot?: OrganizerWhereInput | null
  }

  export type VenueScalarRelationFilter = {
    is?: VenueWhereInput
    isNot?: VenueWhereInput
  }

  export type LeadListRelationFilter = {
    every?: LeadWhereInput
    some?: LeadWhereInput
    none?: LeadWhereInput
  }

  export type LeadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventOrderByRelevanceInput = {
    fields: EventOrderByRelevanceFieldEnum | EventOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EventTitleStartsAtVenueIdCompoundUniqueInput = {
    title: string
    startsAt: Date | string
    venueId: number
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    category?: SortOrder
    hall?: SortOrder
    imageUrl?: SortOrder
    organizerName?: SortOrder
    organizerContactName?: SortOrder
    organizerPhone?: SortOrder
    organizerEmail?: SortOrder
    organizerWebsite?: SortOrder
    organizerFacebook?: SortOrder
    outreachStatus?: SortOrder
    organizerId?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    venueId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    id?: SortOrder
    organizerId?: SortOrder
    venueId?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    category?: SortOrder
    hall?: SortOrder
    imageUrl?: SortOrder
    organizerName?: SortOrder
    organizerContactName?: SortOrder
    organizerPhone?: SortOrder
    organizerEmail?: SortOrder
    organizerWebsite?: SortOrder
    organizerFacebook?: SortOrder
    outreachStatus?: SortOrder
    organizerId?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    venueId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    category?: SortOrder
    hall?: SortOrder
    imageUrl?: SortOrder
    organizerName?: SortOrder
    organizerContactName?: SortOrder
    organizerPhone?: SortOrder
    organizerEmail?: SortOrder
    organizerWebsite?: SortOrder
    organizerFacebook?: SortOrder
    outreachStatus?: SortOrder
    organizerId?: SortOrder
    startsAt?: SortOrder
    endsAt?: SortOrder
    venueId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    id?: SortOrder
    organizerId?: SortOrder
    venueId?: SortOrder
  }

  export type EnumEventSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventSource | EnumEventSourceFieldRefInput<$PrismaModel>
    in?: $Enums.EventSource[]
    notIn?: $Enums.EventSource[]
    not?: NestedEnumEventSourceWithAggregatesFilter<$PrismaModel> | $Enums.EventSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventSourceFilter<$PrismaModel>
    _max?: NestedEnumEventSourceFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumLeadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | EnumLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStatus[]
    notIn?: $Enums.LeadStatus[]
    not?: NestedEnumLeadStatusFilter<$PrismaModel> | $Enums.LeadStatus
  }

  export type EnumLeadPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadPriority | EnumLeadPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.LeadPriority[]
    notIn?: $Enums.LeadPriority[]
    not?: NestedEnumLeadPriorityFilter<$PrismaModel> | $Enums.LeadPriority
  }

  export type EventNullableScalarRelationFilter = {
    is?: EventWhereInput | null
    isNot?: EventWhereInput | null
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadOrderByRelevanceInput = {
    fields: LeadOrderByRelevanceFieldEnum | LeadOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    note?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadAvgOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    note?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    contactName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    note?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadSumOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
  }

  export type EnumLeadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | EnumLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStatus[]
    notIn?: $Enums.LeadStatus[]
    not?: NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeadStatusFilter<$PrismaModel>
    _max?: NestedEnumLeadStatusFilter<$PrismaModel>
  }

  export type EnumLeadPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadPriority | EnumLeadPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.LeadPriority[]
    notIn?: $Enums.LeadPriority[]
    not?: NestedEnumLeadPriorityWithAggregatesFilter<$PrismaModel> | $Enums.LeadPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeadPriorityFilter<$PrismaModel>
    _max?: NestedEnumLeadPriorityFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type LeadScalarRelationFilter = {
    is?: LeadWhereInput
    isNot?: LeadWhereInput
  }

  export type ActivityOrderByRelevanceInput = {
    fields: ActivityOrderByRelevanceFieldEnum | ActivityOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    dueAt?: SortOrder
    done?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityAvgOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    dueAt?: SortOrder
    done?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    dueAt?: SortOrder
    done?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivitySumOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EmailCampaignListRelationFilter = {
    every?: EmailCampaignWhereInput
    some?: EmailCampaignWhereInput
    none?: EmailCampaignWhereInput
  }

  export type EmailCampaignOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailTemplateOrderByRelevanceInput = {
    fields: EmailTemplateOrderByRelevanceFieldEnum | EmailTemplateOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EmailTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailTemplateAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EmailTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailTemplateSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EmailTemplateScalarRelationFilter = {
    is?: EmailTemplateWhereInput
    isNot?: EmailTemplateWhereInput
  }

  export type EmailRecipientListRelationFilter = {
    every?: EmailRecipientWhereInput
    some?: EmailRecipientWhereInput
    none?: EmailRecipientWhereInput
  }

  export type EmailRecipientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailCampaignOrderByRelevanceInput = {
    fields: EmailCampaignOrderByRelevanceFieldEnum | EmailCampaignOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EmailCampaignCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    templateId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailCampaignAvgOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
  }

  export type EmailCampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    templateId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailCampaignMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    templateId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailCampaignSumOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
  }

  export type EmailCampaignScalarRelationFilter = {
    is?: EmailCampaignWhereInput
    isNot?: EmailCampaignWhereInput
  }

  export type EmailRecipientOrderByRelevanceInput = {
    fields: EmailRecipientOrderByRelevanceFieldEnum | EmailRecipientOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EmailRecipientCountOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    company?: SortOrder
    status?: SortOrder
    messageId?: SortOrder
    error?: SortOrder
    sentAt?: SortOrder
  }

  export type EmailRecipientAvgOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
  }

  export type EmailRecipientMaxOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    company?: SortOrder
    status?: SortOrder
    messageId?: SortOrder
    error?: SortOrder
    sentAt?: SortOrder
  }

  export type EmailRecipientMinOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    company?: SortOrder
    status?: SortOrder
    messageId?: SortOrder
    error?: SortOrder
    sentAt?: SortOrder
  }

  export type EmailRecipientSumOrderByAggregateInput = {
    id?: SortOrder
    campaignId?: SortOrder
  }

  export type EventCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type ContactActivityCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<ContactActivityCreateWithoutOrganizerInput, ContactActivityUncheckedCreateWithoutOrganizerInput> | ContactActivityCreateWithoutOrganizerInput[] | ContactActivityUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: ContactActivityCreateOrConnectWithoutOrganizerInput | ContactActivityCreateOrConnectWithoutOrganizerInput[]
    createMany?: ContactActivityCreateManyOrganizerInputEnvelope
    connect?: ContactActivityWhereUniqueInput | ContactActivityWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type ContactActivityUncheckedCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<ContactActivityCreateWithoutOrganizerInput, ContactActivityUncheckedCreateWithoutOrganizerInput> | ContactActivityCreateWithoutOrganizerInput[] | ContactActivityUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: ContactActivityCreateOrConnectWithoutOrganizerInput | ContactActivityCreateOrConnectWithoutOrganizerInput[]
    createMany?: ContactActivityCreateManyOrganizerInputEnvelope
    connect?: ContactActivityWhereUniqueInput | ContactActivityWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EventUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutOrganizerInput | EventUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutOrganizerInput | EventUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutOrganizerInput | EventUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type ContactActivityUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<ContactActivityCreateWithoutOrganizerInput, ContactActivityUncheckedCreateWithoutOrganizerInput> | ContactActivityCreateWithoutOrganizerInput[] | ContactActivityUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: ContactActivityCreateOrConnectWithoutOrganizerInput | ContactActivityCreateOrConnectWithoutOrganizerInput[]
    upsert?: ContactActivityUpsertWithWhereUniqueWithoutOrganizerInput | ContactActivityUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: ContactActivityCreateManyOrganizerInputEnvelope
    set?: ContactActivityWhereUniqueInput | ContactActivityWhereUniqueInput[]
    disconnect?: ContactActivityWhereUniqueInput | ContactActivityWhereUniqueInput[]
    delete?: ContactActivityWhereUniqueInput | ContactActivityWhereUniqueInput[]
    connect?: ContactActivityWhereUniqueInput | ContactActivityWhereUniqueInput[]
    update?: ContactActivityUpdateWithWhereUniqueWithoutOrganizerInput | ContactActivityUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: ContactActivityUpdateManyWithWhereWithoutOrganizerInput | ContactActivityUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: ContactActivityScalarWhereInput | ContactActivityScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventUncheckedUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutOrganizerInput | EventUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutOrganizerInput | EventUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutOrganizerInput | EventUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type ContactActivityUncheckedUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<ContactActivityCreateWithoutOrganizerInput, ContactActivityUncheckedCreateWithoutOrganizerInput> | ContactActivityCreateWithoutOrganizerInput[] | ContactActivityUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: ContactActivityCreateOrConnectWithoutOrganizerInput | ContactActivityCreateOrConnectWithoutOrganizerInput[]
    upsert?: ContactActivityUpsertWithWhereUniqueWithoutOrganizerInput | ContactActivityUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: ContactActivityCreateManyOrganizerInputEnvelope
    set?: ContactActivityWhereUniqueInput | ContactActivityWhereUniqueInput[]
    disconnect?: ContactActivityWhereUniqueInput | ContactActivityWhereUniqueInput[]
    delete?: ContactActivityWhereUniqueInput | ContactActivityWhereUniqueInput[]
    connect?: ContactActivityWhereUniqueInput | ContactActivityWhereUniqueInput[]
    update?: ContactActivityUpdateWithWhereUniqueWithoutOrganizerInput | ContactActivityUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: ContactActivityUpdateManyWithWhereWithoutOrganizerInput | ContactActivityUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: ContactActivityScalarWhereInput | ContactActivityScalarWhereInput[]
  }

  export type OrganizerCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<OrganizerCreateWithoutActivitiesInput, OrganizerUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: OrganizerCreateOrConnectWithoutActivitiesInput
    connect?: OrganizerWhereUniqueInput
  }

  export type OrganizerUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<OrganizerCreateWithoutActivitiesInput, OrganizerUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: OrganizerCreateOrConnectWithoutActivitiesInput
    upsert?: OrganizerUpsertWithoutActivitiesInput
    connect?: OrganizerWhereUniqueInput
    update?: XOR<XOR<OrganizerUpdateToOneWithWhereWithoutActivitiesInput, OrganizerUpdateWithoutActivitiesInput>, OrganizerUncheckedUpdateWithoutActivitiesInput>
  }

  export type EventCreateNestedManyWithoutVenueInput = {
    create?: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput> | EventCreateWithoutVenueInput[] | EventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: EventCreateOrConnectWithoutVenueInput | EventCreateOrConnectWithoutVenueInput[]
    createMany?: EventCreateManyVenueInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutVenueInput = {
    create?: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput> | EventCreateWithoutVenueInput[] | EventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: EventCreateOrConnectWithoutVenueInput | EventCreateOrConnectWithoutVenueInput[]
    createMany?: EventCreateManyVenueInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type EventUpdateManyWithoutVenueNestedInput = {
    create?: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput> | EventCreateWithoutVenueInput[] | EventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: EventCreateOrConnectWithoutVenueInput | EventCreateOrConnectWithoutVenueInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutVenueInput | EventUpsertWithWhereUniqueWithoutVenueInput[]
    createMany?: EventCreateManyVenueInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutVenueInput | EventUpdateWithWhereUniqueWithoutVenueInput[]
    updateMany?: EventUpdateManyWithWhereWithoutVenueInput | EventUpdateManyWithWhereWithoutVenueInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutVenueNestedInput = {
    create?: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput> | EventCreateWithoutVenueInput[] | EventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: EventCreateOrConnectWithoutVenueInput | EventCreateOrConnectWithoutVenueInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutVenueInput | EventUpsertWithWhereUniqueWithoutVenueInput[]
    createMany?: EventCreateManyVenueInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutVenueInput | EventUpdateWithWhereUniqueWithoutVenueInput[]
    updateMany?: EventUpdateManyWithWhereWithoutVenueInput | EventUpdateManyWithWhereWithoutVenueInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type OrganizerCreateNestedOneWithoutEventsInput = {
    create?: XOR<OrganizerCreateWithoutEventsInput, OrganizerUncheckedCreateWithoutEventsInput>
    connectOrCreate?: OrganizerCreateOrConnectWithoutEventsInput
    connect?: OrganizerWhereUniqueInput
  }

  export type VenueCreateNestedOneWithoutEventsInput = {
    create?: XOR<VenueCreateWithoutEventsInput, VenueUncheckedCreateWithoutEventsInput>
    connectOrCreate?: VenueCreateOrConnectWithoutEventsInput
    connect?: VenueWhereUniqueInput
  }

  export type LeadCreateNestedManyWithoutEventInput = {
    create?: XOR<LeadCreateWithoutEventInput, LeadUncheckedCreateWithoutEventInput> | LeadCreateWithoutEventInput[] | LeadUncheckedCreateWithoutEventInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutEventInput | LeadCreateOrConnectWithoutEventInput[]
    createMany?: LeadCreateManyEventInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<LeadCreateWithoutEventInput, LeadUncheckedCreateWithoutEventInput> | LeadCreateWithoutEventInput[] | LeadUncheckedCreateWithoutEventInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutEventInput | LeadCreateOrConnectWithoutEventInput[]
    createMany?: LeadCreateManyEventInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type EnumEventSourceFieldUpdateOperationsInput = {
    set?: $Enums.EventSource
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrganizerUpdateOneWithoutEventsNestedInput = {
    create?: XOR<OrganizerCreateWithoutEventsInput, OrganizerUncheckedCreateWithoutEventsInput>
    connectOrCreate?: OrganizerCreateOrConnectWithoutEventsInput
    upsert?: OrganizerUpsertWithoutEventsInput
    disconnect?: OrganizerWhereInput | boolean
    delete?: OrganizerWhereInput | boolean
    connect?: OrganizerWhereUniqueInput
    update?: XOR<XOR<OrganizerUpdateToOneWithWhereWithoutEventsInput, OrganizerUpdateWithoutEventsInput>, OrganizerUncheckedUpdateWithoutEventsInput>
  }

  export type VenueUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<VenueCreateWithoutEventsInput, VenueUncheckedCreateWithoutEventsInput>
    connectOrCreate?: VenueCreateOrConnectWithoutEventsInput
    upsert?: VenueUpsertWithoutEventsInput
    connect?: VenueWhereUniqueInput
    update?: XOR<XOR<VenueUpdateToOneWithWhereWithoutEventsInput, VenueUpdateWithoutEventsInput>, VenueUncheckedUpdateWithoutEventsInput>
  }

  export type LeadUpdateManyWithoutEventNestedInput = {
    create?: XOR<LeadCreateWithoutEventInput, LeadUncheckedCreateWithoutEventInput> | LeadCreateWithoutEventInput[] | LeadUncheckedCreateWithoutEventInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutEventInput | LeadCreateOrConnectWithoutEventInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutEventInput | LeadUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: LeadCreateManyEventInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutEventInput | LeadUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutEventInput | LeadUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LeadUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<LeadCreateWithoutEventInput, LeadUncheckedCreateWithoutEventInput> | LeadCreateWithoutEventInput[] | LeadUncheckedCreateWithoutEventInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutEventInput | LeadCreateOrConnectWithoutEventInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutEventInput | LeadUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: LeadCreateManyEventInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutEventInput | LeadUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutEventInput | LeadUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutLeadsInput = {
    create?: XOR<EventCreateWithoutLeadsInput, EventUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: EventCreateOrConnectWithoutLeadsInput
    connect?: EventWhereUniqueInput
  }

  export type ActivityCreateNestedManyWithoutLeadInput = {
    create?: XOR<ActivityCreateWithoutLeadInput, ActivityUncheckedCreateWithoutLeadInput> | ActivityCreateWithoutLeadInput[] | ActivityUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutLeadInput | ActivityCreateOrConnectWithoutLeadInput[]
    createMany?: ActivityCreateManyLeadInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<ActivityCreateWithoutLeadInput, ActivityUncheckedCreateWithoutLeadInput> | ActivityCreateWithoutLeadInput[] | ActivityUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutLeadInput | ActivityCreateOrConnectWithoutLeadInput[]
    createMany?: ActivityCreateManyLeadInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type EnumLeadStatusFieldUpdateOperationsInput = {
    set?: $Enums.LeadStatus
  }

  export type EnumLeadPriorityFieldUpdateOperationsInput = {
    set?: $Enums.LeadPriority
  }

  export type EventUpdateOneWithoutLeadsNestedInput = {
    create?: XOR<EventCreateWithoutLeadsInput, EventUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: EventCreateOrConnectWithoutLeadsInput
    upsert?: EventUpsertWithoutLeadsInput
    disconnect?: EventWhereInput | boolean
    delete?: EventWhereInput | boolean
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutLeadsInput, EventUpdateWithoutLeadsInput>, EventUncheckedUpdateWithoutLeadsInput>
  }

  export type ActivityUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ActivityCreateWithoutLeadInput, ActivityUncheckedCreateWithoutLeadInput> | ActivityCreateWithoutLeadInput[] | ActivityUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutLeadInput | ActivityCreateOrConnectWithoutLeadInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutLeadInput | ActivityUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ActivityCreateManyLeadInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutLeadInput | ActivityUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutLeadInput | ActivityUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ActivityCreateWithoutLeadInput, ActivityUncheckedCreateWithoutLeadInput> | ActivityCreateWithoutLeadInput[] | ActivityUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutLeadInput | ActivityCreateOrConnectWithoutLeadInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutLeadInput | ActivityUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ActivityCreateManyLeadInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutLeadInput | ActivityUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutLeadInput | ActivityUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<LeadCreateWithoutActivitiesInput, LeadUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutActivitiesInput
    connect?: LeadWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type LeadUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<LeadCreateWithoutActivitiesInput, LeadUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutActivitiesInput
    upsert?: LeadUpsertWithoutActivitiesInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutActivitiesInput, LeadUpdateWithoutActivitiesInput>, LeadUncheckedUpdateWithoutActivitiesInput>
  }

  export type EmailCampaignCreateNestedManyWithoutTemplateInput = {
    create?: XOR<EmailCampaignCreateWithoutTemplateInput, EmailCampaignUncheckedCreateWithoutTemplateInput> | EmailCampaignCreateWithoutTemplateInput[] | EmailCampaignUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: EmailCampaignCreateOrConnectWithoutTemplateInput | EmailCampaignCreateOrConnectWithoutTemplateInput[]
    createMany?: EmailCampaignCreateManyTemplateInputEnvelope
    connect?: EmailCampaignWhereUniqueInput | EmailCampaignWhereUniqueInput[]
  }

  export type EmailCampaignUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<EmailCampaignCreateWithoutTemplateInput, EmailCampaignUncheckedCreateWithoutTemplateInput> | EmailCampaignCreateWithoutTemplateInput[] | EmailCampaignUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: EmailCampaignCreateOrConnectWithoutTemplateInput | EmailCampaignCreateOrConnectWithoutTemplateInput[]
    createMany?: EmailCampaignCreateManyTemplateInputEnvelope
    connect?: EmailCampaignWhereUniqueInput | EmailCampaignWhereUniqueInput[]
  }

  export type EmailCampaignUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<EmailCampaignCreateWithoutTemplateInput, EmailCampaignUncheckedCreateWithoutTemplateInput> | EmailCampaignCreateWithoutTemplateInput[] | EmailCampaignUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: EmailCampaignCreateOrConnectWithoutTemplateInput | EmailCampaignCreateOrConnectWithoutTemplateInput[]
    upsert?: EmailCampaignUpsertWithWhereUniqueWithoutTemplateInput | EmailCampaignUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: EmailCampaignCreateManyTemplateInputEnvelope
    set?: EmailCampaignWhereUniqueInput | EmailCampaignWhereUniqueInput[]
    disconnect?: EmailCampaignWhereUniqueInput | EmailCampaignWhereUniqueInput[]
    delete?: EmailCampaignWhereUniqueInput | EmailCampaignWhereUniqueInput[]
    connect?: EmailCampaignWhereUniqueInput | EmailCampaignWhereUniqueInput[]
    update?: EmailCampaignUpdateWithWhereUniqueWithoutTemplateInput | EmailCampaignUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: EmailCampaignUpdateManyWithWhereWithoutTemplateInput | EmailCampaignUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: EmailCampaignScalarWhereInput | EmailCampaignScalarWhereInput[]
  }

  export type EmailCampaignUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<EmailCampaignCreateWithoutTemplateInput, EmailCampaignUncheckedCreateWithoutTemplateInput> | EmailCampaignCreateWithoutTemplateInput[] | EmailCampaignUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: EmailCampaignCreateOrConnectWithoutTemplateInput | EmailCampaignCreateOrConnectWithoutTemplateInput[]
    upsert?: EmailCampaignUpsertWithWhereUniqueWithoutTemplateInput | EmailCampaignUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: EmailCampaignCreateManyTemplateInputEnvelope
    set?: EmailCampaignWhereUniqueInput | EmailCampaignWhereUniqueInput[]
    disconnect?: EmailCampaignWhereUniqueInput | EmailCampaignWhereUniqueInput[]
    delete?: EmailCampaignWhereUniqueInput | EmailCampaignWhereUniqueInput[]
    connect?: EmailCampaignWhereUniqueInput | EmailCampaignWhereUniqueInput[]
    update?: EmailCampaignUpdateWithWhereUniqueWithoutTemplateInput | EmailCampaignUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: EmailCampaignUpdateManyWithWhereWithoutTemplateInput | EmailCampaignUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: EmailCampaignScalarWhereInput | EmailCampaignScalarWhereInput[]
  }

  export type EmailTemplateCreateNestedOneWithoutCampaignsInput = {
    create?: XOR<EmailTemplateCreateWithoutCampaignsInput, EmailTemplateUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: EmailTemplateCreateOrConnectWithoutCampaignsInput
    connect?: EmailTemplateWhereUniqueInput
  }

  export type EmailRecipientCreateNestedManyWithoutCampaignInput = {
    create?: XOR<EmailRecipientCreateWithoutCampaignInput, EmailRecipientUncheckedCreateWithoutCampaignInput> | EmailRecipientCreateWithoutCampaignInput[] | EmailRecipientUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: EmailRecipientCreateOrConnectWithoutCampaignInput | EmailRecipientCreateOrConnectWithoutCampaignInput[]
    createMany?: EmailRecipientCreateManyCampaignInputEnvelope
    connect?: EmailRecipientWhereUniqueInput | EmailRecipientWhereUniqueInput[]
  }

  export type EmailRecipientUncheckedCreateNestedManyWithoutCampaignInput = {
    create?: XOR<EmailRecipientCreateWithoutCampaignInput, EmailRecipientUncheckedCreateWithoutCampaignInput> | EmailRecipientCreateWithoutCampaignInput[] | EmailRecipientUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: EmailRecipientCreateOrConnectWithoutCampaignInput | EmailRecipientCreateOrConnectWithoutCampaignInput[]
    createMany?: EmailRecipientCreateManyCampaignInputEnvelope
    connect?: EmailRecipientWhereUniqueInput | EmailRecipientWhereUniqueInput[]
  }

  export type EmailTemplateUpdateOneRequiredWithoutCampaignsNestedInput = {
    create?: XOR<EmailTemplateCreateWithoutCampaignsInput, EmailTemplateUncheckedCreateWithoutCampaignsInput>
    connectOrCreate?: EmailTemplateCreateOrConnectWithoutCampaignsInput
    upsert?: EmailTemplateUpsertWithoutCampaignsInput
    connect?: EmailTemplateWhereUniqueInput
    update?: XOR<XOR<EmailTemplateUpdateToOneWithWhereWithoutCampaignsInput, EmailTemplateUpdateWithoutCampaignsInput>, EmailTemplateUncheckedUpdateWithoutCampaignsInput>
  }

  export type EmailRecipientUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<EmailRecipientCreateWithoutCampaignInput, EmailRecipientUncheckedCreateWithoutCampaignInput> | EmailRecipientCreateWithoutCampaignInput[] | EmailRecipientUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: EmailRecipientCreateOrConnectWithoutCampaignInput | EmailRecipientCreateOrConnectWithoutCampaignInput[]
    upsert?: EmailRecipientUpsertWithWhereUniqueWithoutCampaignInput | EmailRecipientUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: EmailRecipientCreateManyCampaignInputEnvelope
    set?: EmailRecipientWhereUniqueInput | EmailRecipientWhereUniqueInput[]
    disconnect?: EmailRecipientWhereUniqueInput | EmailRecipientWhereUniqueInput[]
    delete?: EmailRecipientWhereUniqueInput | EmailRecipientWhereUniqueInput[]
    connect?: EmailRecipientWhereUniqueInput | EmailRecipientWhereUniqueInput[]
    update?: EmailRecipientUpdateWithWhereUniqueWithoutCampaignInput | EmailRecipientUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: EmailRecipientUpdateManyWithWhereWithoutCampaignInput | EmailRecipientUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: EmailRecipientScalarWhereInput | EmailRecipientScalarWhereInput[]
  }

  export type EmailRecipientUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?: XOR<EmailRecipientCreateWithoutCampaignInput, EmailRecipientUncheckedCreateWithoutCampaignInput> | EmailRecipientCreateWithoutCampaignInput[] | EmailRecipientUncheckedCreateWithoutCampaignInput[]
    connectOrCreate?: EmailRecipientCreateOrConnectWithoutCampaignInput | EmailRecipientCreateOrConnectWithoutCampaignInput[]
    upsert?: EmailRecipientUpsertWithWhereUniqueWithoutCampaignInput | EmailRecipientUpsertWithWhereUniqueWithoutCampaignInput[]
    createMany?: EmailRecipientCreateManyCampaignInputEnvelope
    set?: EmailRecipientWhereUniqueInput | EmailRecipientWhereUniqueInput[]
    disconnect?: EmailRecipientWhereUniqueInput | EmailRecipientWhereUniqueInput[]
    delete?: EmailRecipientWhereUniqueInput | EmailRecipientWhereUniqueInput[]
    connect?: EmailRecipientWhereUniqueInput | EmailRecipientWhereUniqueInput[]
    update?: EmailRecipientUpdateWithWhereUniqueWithoutCampaignInput | EmailRecipientUpdateWithWhereUniqueWithoutCampaignInput[]
    updateMany?: EmailRecipientUpdateManyWithWhereWithoutCampaignInput | EmailRecipientUpdateManyWithWhereWithoutCampaignInput[]
    deleteMany?: EmailRecipientScalarWhereInput | EmailRecipientScalarWhereInput[]
  }

  export type EmailCampaignCreateNestedOneWithoutRecipientsInput = {
    create?: XOR<EmailCampaignCreateWithoutRecipientsInput, EmailCampaignUncheckedCreateWithoutRecipientsInput>
    connectOrCreate?: EmailCampaignCreateOrConnectWithoutRecipientsInput
    connect?: EmailCampaignWhereUniqueInput
  }

  export type EmailCampaignUpdateOneRequiredWithoutRecipientsNestedInput = {
    create?: XOR<EmailCampaignCreateWithoutRecipientsInput, EmailCampaignUncheckedCreateWithoutRecipientsInput>
    connectOrCreate?: EmailCampaignCreateOrConnectWithoutRecipientsInput
    upsert?: EmailCampaignUpsertWithoutRecipientsInput
    connect?: EmailCampaignWhereUniqueInput
    update?: XOR<XOR<EmailCampaignUpdateToOneWithWhereWithoutRecipientsInput, EmailCampaignUpdateWithoutRecipientsInput>, EmailCampaignUncheckedUpdateWithoutRecipientsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumEventSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.EventSource | EnumEventSourceFieldRefInput<$PrismaModel>
    in?: $Enums.EventSource[]
    notIn?: $Enums.EventSource[]
    not?: NestedEnumEventSourceFilter<$PrismaModel> | $Enums.EventSource
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumEventSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventSource | EnumEventSourceFieldRefInput<$PrismaModel>
    in?: $Enums.EventSource[]
    notIn?: $Enums.EventSource[]
    not?: NestedEnumEventSourceWithAggregatesFilter<$PrismaModel> | $Enums.EventSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventSourceFilter<$PrismaModel>
    _max?: NestedEnumEventSourceFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumLeadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | EnumLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStatus[]
    notIn?: $Enums.LeadStatus[]
    not?: NestedEnumLeadStatusFilter<$PrismaModel> | $Enums.LeadStatus
  }

  export type NestedEnumLeadPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadPriority | EnumLeadPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.LeadPriority[]
    notIn?: $Enums.LeadPriority[]
    not?: NestedEnumLeadPriorityFilter<$PrismaModel> | $Enums.LeadPriority
  }

  export type NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | EnumLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStatus[]
    notIn?: $Enums.LeadStatus[]
    not?: NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeadStatusFilter<$PrismaModel>
    _max?: NestedEnumLeadStatusFilter<$PrismaModel>
  }

  export type NestedEnumLeadPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadPriority | EnumLeadPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.LeadPriority[]
    notIn?: $Enums.LeadPriority[]
    not?: NestedEnumLeadPriorityWithAggregatesFilter<$PrismaModel> | $Enums.LeadPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeadPriorityFilter<$PrismaModel>
    _max?: NestedEnumLeadPriorityFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EventCreateWithoutOrganizerInput = {
    title: string
    source: $Enums.EventSource
    sourceUrl?: string | null
    category?: string | null
    hall?: string | null
    imageUrl?: string | null
    organizerName?: string | null
    organizerContactName?: string | null
    organizerPhone?: string | null
    organizerEmail?: string | null
    organizerWebsite?: string | null
    organizerFacebook?: string | null
    outreachStatus?: string
    startsAt: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    venue: VenueCreateNestedOneWithoutEventsInput
    leads?: LeadCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutOrganizerInput = {
    id?: number
    title: string
    source: $Enums.EventSource
    sourceUrl?: string | null
    category?: string | null
    hall?: string | null
    imageUrl?: string | null
    organizerName?: string | null
    organizerContactName?: string | null
    organizerPhone?: string | null
    organizerEmail?: string | null
    organizerWebsite?: string | null
    organizerFacebook?: string | null
    outreachStatus?: string
    startsAt: Date | string
    endsAt?: Date | string | null
    venueId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput>
  }

  export type EventCreateManyOrganizerInputEnvelope = {
    data: EventCreateManyOrganizerInput | EventCreateManyOrganizerInput[]
    skipDuplicates?: boolean
  }

  export type ContactActivityCreateWithoutOrganizerInput = {
    type?: string
    text: string
    createdAt?: Date | string
  }

  export type ContactActivityUncheckedCreateWithoutOrganizerInput = {
    id?: number
    type?: string
    text: string
    createdAt?: Date | string
  }

  export type ContactActivityCreateOrConnectWithoutOrganizerInput = {
    where: ContactActivityWhereUniqueInput
    create: XOR<ContactActivityCreateWithoutOrganizerInput, ContactActivityUncheckedCreateWithoutOrganizerInput>
  }

  export type ContactActivityCreateManyOrganizerInputEnvelope = {
    data: ContactActivityCreateManyOrganizerInput | ContactActivityCreateManyOrganizerInput[]
    skipDuplicates?: boolean
  }

  export type EventUpsertWithWhereUniqueWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutOrganizerInput, EventUncheckedUpdateWithoutOrganizerInput>
    create: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput>
  }

  export type EventUpdateWithWhereUniqueWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutOrganizerInput, EventUncheckedUpdateWithoutOrganizerInput>
  }

  export type EventUpdateManyWithWhereWithoutOrganizerInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutOrganizerInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: IntFilter<"Event"> | number
    title?: StringFilter<"Event"> | string
    source?: EnumEventSourceFilter<"Event"> | $Enums.EventSource
    sourceUrl?: StringNullableFilter<"Event"> | string | null
    category?: StringNullableFilter<"Event"> | string | null
    hall?: StringNullableFilter<"Event"> | string | null
    imageUrl?: StringNullableFilter<"Event"> | string | null
    organizerName?: StringNullableFilter<"Event"> | string | null
    organizerContactName?: StringNullableFilter<"Event"> | string | null
    organizerPhone?: StringNullableFilter<"Event"> | string | null
    organizerEmail?: StringNullableFilter<"Event"> | string | null
    organizerWebsite?: StringNullableFilter<"Event"> | string | null
    organizerFacebook?: StringNullableFilter<"Event"> | string | null
    outreachStatus?: StringFilter<"Event"> | string
    organizerId?: IntNullableFilter<"Event"> | number | null
    startsAt?: DateTimeFilter<"Event"> | Date | string
    endsAt?: DateTimeNullableFilter<"Event"> | Date | string | null
    venueId?: IntFilter<"Event"> | number
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
  }

  export type ContactActivityUpsertWithWhereUniqueWithoutOrganizerInput = {
    where: ContactActivityWhereUniqueInput
    update: XOR<ContactActivityUpdateWithoutOrganizerInput, ContactActivityUncheckedUpdateWithoutOrganizerInput>
    create: XOR<ContactActivityCreateWithoutOrganizerInput, ContactActivityUncheckedCreateWithoutOrganizerInput>
  }

  export type ContactActivityUpdateWithWhereUniqueWithoutOrganizerInput = {
    where: ContactActivityWhereUniqueInput
    data: XOR<ContactActivityUpdateWithoutOrganizerInput, ContactActivityUncheckedUpdateWithoutOrganizerInput>
  }

  export type ContactActivityUpdateManyWithWhereWithoutOrganizerInput = {
    where: ContactActivityScalarWhereInput
    data: XOR<ContactActivityUpdateManyMutationInput, ContactActivityUncheckedUpdateManyWithoutOrganizerInput>
  }

  export type ContactActivityScalarWhereInput = {
    AND?: ContactActivityScalarWhereInput | ContactActivityScalarWhereInput[]
    OR?: ContactActivityScalarWhereInput[]
    NOT?: ContactActivityScalarWhereInput | ContactActivityScalarWhereInput[]
    id?: IntFilter<"ContactActivity"> | number
    organizerId?: IntFilter<"ContactActivity"> | number
    type?: StringFilter<"ContactActivity"> | string
    text?: StringFilter<"ContactActivity"> | string
    createdAt?: DateTimeFilter<"ContactActivity"> | Date | string
  }

  export type OrganizerCreateWithoutActivitiesInput = {
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    facebook?: string | null
    note?: string | null
    outreachStatus?: string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutOrganizerInput
  }

  export type OrganizerUncheckedCreateWithoutActivitiesInput = {
    id?: number
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    facebook?: string | null
    note?: string | null
    outreachStatus?: string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutOrganizerInput
  }

  export type OrganizerCreateOrConnectWithoutActivitiesInput = {
    where: OrganizerWhereUniqueInput
    create: XOR<OrganizerCreateWithoutActivitiesInput, OrganizerUncheckedCreateWithoutActivitiesInput>
  }

  export type OrganizerUpsertWithoutActivitiesInput = {
    update: XOR<OrganizerUpdateWithoutActivitiesInput, OrganizerUncheckedUpdateWithoutActivitiesInput>
    create: XOR<OrganizerCreateWithoutActivitiesInput, OrganizerUncheckedCreateWithoutActivitiesInput>
    where?: OrganizerWhereInput
  }

  export type OrganizerUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: OrganizerWhereInput
    data: XOR<OrganizerUpdateWithoutActivitiesInput, OrganizerUncheckedUpdateWithoutActivitiesInput>
  }

  export type OrganizerUpdateWithoutActivitiesInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutOrganizerNestedInput
  }

  export type OrganizerUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutOrganizerNestedInput
  }

  export type EventCreateWithoutVenueInput = {
    title: string
    source: $Enums.EventSource
    sourceUrl?: string | null
    category?: string | null
    hall?: string | null
    imageUrl?: string | null
    organizerName?: string | null
    organizerContactName?: string | null
    organizerPhone?: string | null
    organizerEmail?: string | null
    organizerWebsite?: string | null
    organizerFacebook?: string | null
    outreachStatus?: string
    startsAt: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer?: OrganizerCreateNestedOneWithoutEventsInput
    leads?: LeadCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutVenueInput = {
    id?: number
    title: string
    source: $Enums.EventSource
    sourceUrl?: string | null
    category?: string | null
    hall?: string | null
    imageUrl?: string | null
    organizerName?: string | null
    organizerContactName?: string | null
    organizerPhone?: string | null
    organizerEmail?: string | null
    organizerWebsite?: string | null
    organizerFacebook?: string | null
    outreachStatus?: string
    organizerId?: number | null
    startsAt: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutVenueInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput>
  }

  export type EventCreateManyVenueInputEnvelope = {
    data: EventCreateManyVenueInput | EventCreateManyVenueInput[]
    skipDuplicates?: boolean
  }

  export type EventUpsertWithWhereUniqueWithoutVenueInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutVenueInput, EventUncheckedUpdateWithoutVenueInput>
    create: XOR<EventCreateWithoutVenueInput, EventUncheckedCreateWithoutVenueInput>
  }

  export type EventUpdateWithWhereUniqueWithoutVenueInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutVenueInput, EventUncheckedUpdateWithoutVenueInput>
  }

  export type EventUpdateManyWithWhereWithoutVenueInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutVenueInput>
  }

  export type OrganizerCreateWithoutEventsInput = {
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    facebook?: string | null
    note?: string | null
    outreachStatus?: string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ContactActivityCreateNestedManyWithoutOrganizerInput
  }

  export type OrganizerUncheckedCreateWithoutEventsInput = {
    id?: number
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    facebook?: string | null
    note?: string | null
    outreachStatus?: string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ContactActivityUncheckedCreateNestedManyWithoutOrganizerInput
  }

  export type OrganizerCreateOrConnectWithoutEventsInput = {
    where: OrganizerWhereUniqueInput
    create: XOR<OrganizerCreateWithoutEventsInput, OrganizerUncheckedCreateWithoutEventsInput>
  }

  export type VenueCreateWithoutEventsInput = {
    name: string
    slug: string
    website?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VenueUncheckedCreateWithoutEventsInput = {
    id?: number
    name: string
    slug: string
    website?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VenueCreateOrConnectWithoutEventsInput = {
    where: VenueWhereUniqueInput
    create: XOR<VenueCreateWithoutEventsInput, VenueUncheckedCreateWithoutEventsInput>
  }

  export type LeadCreateWithoutEventInput = {
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    status?: $Enums.LeadStatus
    priority?: $Enums.LeadPriority
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutEventInput = {
    id?: number
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    status?: $Enums.LeadStatus
    priority?: $Enums.LeadPriority
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutEventInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutEventInput, LeadUncheckedCreateWithoutEventInput>
  }

  export type LeadCreateManyEventInputEnvelope = {
    data: LeadCreateManyEventInput | LeadCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type OrganizerUpsertWithoutEventsInput = {
    update: XOR<OrganizerUpdateWithoutEventsInput, OrganizerUncheckedUpdateWithoutEventsInput>
    create: XOR<OrganizerCreateWithoutEventsInput, OrganizerUncheckedCreateWithoutEventsInput>
    where?: OrganizerWhereInput
  }

  export type OrganizerUpdateToOneWithWhereWithoutEventsInput = {
    where?: OrganizerWhereInput
    data: XOR<OrganizerUpdateWithoutEventsInput, OrganizerUncheckedUpdateWithoutEventsInput>
  }

  export type OrganizerUpdateWithoutEventsInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ContactActivityUpdateManyWithoutOrganizerNestedInput
  }

  export type OrganizerUncheckedUpdateWithoutEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    facebook?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    lockedFields?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ContactActivityUncheckedUpdateManyWithoutOrganizerNestedInput
  }

  export type VenueUpsertWithoutEventsInput = {
    update: XOR<VenueUpdateWithoutEventsInput, VenueUncheckedUpdateWithoutEventsInput>
    create: XOR<VenueCreateWithoutEventsInput, VenueUncheckedCreateWithoutEventsInput>
    where?: VenueWhereInput
  }

  export type VenueUpdateToOneWithWhereWithoutEventsInput = {
    where?: VenueWhereInput
    data: XOR<VenueUpdateWithoutEventsInput, VenueUncheckedUpdateWithoutEventsInput>
  }

  export type VenueUpdateWithoutEventsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueUncheckedUpdateWithoutEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUpsertWithWhereUniqueWithoutEventInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutEventInput, LeadUncheckedUpdateWithoutEventInput>
    create: XOR<LeadCreateWithoutEventInput, LeadUncheckedCreateWithoutEventInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutEventInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutEventInput, LeadUncheckedUpdateWithoutEventInput>
  }

  export type LeadUpdateManyWithWhereWithoutEventInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutEventInput>
  }

  export type LeadScalarWhereInput = {
    AND?: LeadScalarWhereInput | LeadScalarWhereInput[]
    OR?: LeadScalarWhereInput[]
    NOT?: LeadScalarWhereInput | LeadScalarWhereInput[]
    id?: IntFilter<"Lead"> | number
    companyName?: StringFilter<"Lead"> | string
    contactName?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    status?: EnumLeadStatusFilter<"Lead"> | $Enums.LeadStatus
    priority?: EnumLeadPriorityFilter<"Lead"> | $Enums.LeadPriority
    note?: StringNullableFilter<"Lead"> | string | null
    eventId?: IntNullableFilter<"Lead"> | number | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
  }

  export type EventCreateWithoutLeadsInput = {
    title: string
    source: $Enums.EventSource
    sourceUrl?: string | null
    category?: string | null
    hall?: string | null
    imageUrl?: string | null
    organizerName?: string | null
    organizerContactName?: string | null
    organizerPhone?: string | null
    organizerEmail?: string | null
    organizerWebsite?: string | null
    organizerFacebook?: string | null
    outreachStatus?: string
    startsAt: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer?: OrganizerCreateNestedOneWithoutEventsInput
    venue: VenueCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateWithoutLeadsInput = {
    id?: number
    title: string
    source: $Enums.EventSource
    sourceUrl?: string | null
    category?: string | null
    hall?: string | null
    imageUrl?: string | null
    organizerName?: string | null
    organizerContactName?: string | null
    organizerPhone?: string | null
    organizerEmail?: string | null
    organizerWebsite?: string | null
    organizerFacebook?: string | null
    outreachStatus?: string
    organizerId?: number | null
    startsAt: Date | string
    endsAt?: Date | string | null
    venueId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventCreateOrConnectWithoutLeadsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutLeadsInput, EventUncheckedCreateWithoutLeadsInput>
  }

  export type ActivityCreateWithoutLeadInput = {
    title: string
    dueAt?: Date | string | null
    done?: boolean
    createdAt?: Date | string
  }

  export type ActivityUncheckedCreateWithoutLeadInput = {
    id?: number
    title: string
    dueAt?: Date | string | null
    done?: boolean
    createdAt?: Date | string
  }

  export type ActivityCreateOrConnectWithoutLeadInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutLeadInput, ActivityUncheckedCreateWithoutLeadInput>
  }

  export type ActivityCreateManyLeadInputEnvelope = {
    data: ActivityCreateManyLeadInput | ActivityCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type EventUpsertWithoutLeadsInput = {
    update: XOR<EventUpdateWithoutLeadsInput, EventUncheckedUpdateWithoutLeadsInput>
    create: XOR<EventCreateWithoutLeadsInput, EventUncheckedCreateWithoutLeadsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutLeadsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutLeadsInput, EventUncheckedUpdateWithoutLeadsInput>
  }

  export type EventUpdateWithoutLeadsInput = {
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: OrganizerUpdateOneWithoutEventsNestedInput
    venue?: VenueUpdateOneRequiredWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateWithoutLeadsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    organizerId?: NullableIntFieldUpdateOperationsInput | number | null
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venueId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUpsertWithWhereUniqueWithoutLeadInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutLeadInput, ActivityUncheckedUpdateWithoutLeadInput>
    create: XOR<ActivityCreateWithoutLeadInput, ActivityUncheckedCreateWithoutLeadInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutLeadInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutLeadInput, ActivityUncheckedUpdateWithoutLeadInput>
  }

  export type ActivityUpdateManyWithWhereWithoutLeadInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutLeadInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: IntFilter<"Activity"> | number
    leadId?: IntFilter<"Activity"> | number
    title?: StringFilter<"Activity"> | string
    dueAt?: DateTimeNullableFilter<"Activity"> | Date | string | null
    done?: BoolFilter<"Activity"> | boolean
    createdAt?: DateTimeFilter<"Activity"> | Date | string
  }

  export type LeadCreateWithoutActivitiesInput = {
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    status?: $Enums.LeadStatus
    priority?: $Enums.LeadPriority
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event?: EventCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateWithoutActivitiesInput = {
    id?: number
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    status?: $Enums.LeadStatus
    priority?: $Enums.LeadPriority
    note?: string | null
    eventId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadCreateOrConnectWithoutActivitiesInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutActivitiesInput, LeadUncheckedCreateWithoutActivitiesInput>
  }

  export type LeadUpsertWithoutActivitiesInput = {
    update: XOR<LeadUpdateWithoutActivitiesInput, LeadUncheckedUpdateWithoutActivitiesInput>
    create: XOR<LeadCreateWithoutActivitiesInput, LeadUncheckedCreateWithoutActivitiesInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutActivitiesInput, LeadUncheckedUpdateWithoutActivitiesInput>
  }

  export type LeadUpdateWithoutActivitiesInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    priority?: EnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    priority?: EnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority
    note?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailCampaignCreateWithoutTemplateInput = {
    name: string
    subject: string
    body: string
    status?: string
    sentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipients?: EmailRecipientCreateNestedManyWithoutCampaignInput
  }

  export type EmailCampaignUncheckedCreateWithoutTemplateInput = {
    id?: number
    name: string
    subject: string
    body: string
    status?: string
    sentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recipients?: EmailRecipientUncheckedCreateNestedManyWithoutCampaignInput
  }

  export type EmailCampaignCreateOrConnectWithoutTemplateInput = {
    where: EmailCampaignWhereUniqueInput
    create: XOR<EmailCampaignCreateWithoutTemplateInput, EmailCampaignUncheckedCreateWithoutTemplateInput>
  }

  export type EmailCampaignCreateManyTemplateInputEnvelope = {
    data: EmailCampaignCreateManyTemplateInput | EmailCampaignCreateManyTemplateInput[]
    skipDuplicates?: boolean
  }

  export type EmailCampaignUpsertWithWhereUniqueWithoutTemplateInput = {
    where: EmailCampaignWhereUniqueInput
    update: XOR<EmailCampaignUpdateWithoutTemplateInput, EmailCampaignUncheckedUpdateWithoutTemplateInput>
    create: XOR<EmailCampaignCreateWithoutTemplateInput, EmailCampaignUncheckedCreateWithoutTemplateInput>
  }

  export type EmailCampaignUpdateWithWhereUniqueWithoutTemplateInput = {
    where: EmailCampaignWhereUniqueInput
    data: XOR<EmailCampaignUpdateWithoutTemplateInput, EmailCampaignUncheckedUpdateWithoutTemplateInput>
  }

  export type EmailCampaignUpdateManyWithWhereWithoutTemplateInput = {
    where: EmailCampaignScalarWhereInput
    data: XOR<EmailCampaignUpdateManyMutationInput, EmailCampaignUncheckedUpdateManyWithoutTemplateInput>
  }

  export type EmailCampaignScalarWhereInput = {
    AND?: EmailCampaignScalarWhereInput | EmailCampaignScalarWhereInput[]
    OR?: EmailCampaignScalarWhereInput[]
    NOT?: EmailCampaignScalarWhereInput | EmailCampaignScalarWhereInput[]
    id?: IntFilter<"EmailCampaign"> | number
    name?: StringFilter<"EmailCampaign"> | string
    templateId?: IntFilter<"EmailCampaign"> | number
    subject?: StringFilter<"EmailCampaign"> | string
    body?: StringFilter<"EmailCampaign"> | string
    status?: StringFilter<"EmailCampaign"> | string
    sentAt?: DateTimeNullableFilter<"EmailCampaign"> | Date | string | null
    createdAt?: DateTimeFilter<"EmailCampaign"> | Date | string
    updatedAt?: DateTimeFilter<"EmailCampaign"> | Date | string
  }

  export type EmailTemplateCreateWithoutCampaignsInput = {
    name: string
    subject: string
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailTemplateUncheckedCreateWithoutCampaignsInput = {
    id?: number
    name: string
    subject: string
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailTemplateCreateOrConnectWithoutCampaignsInput = {
    where: EmailTemplateWhereUniqueInput
    create: XOR<EmailTemplateCreateWithoutCampaignsInput, EmailTemplateUncheckedCreateWithoutCampaignsInput>
  }

  export type EmailRecipientCreateWithoutCampaignInput = {
    email: string
    name?: string | null
    company?: string | null
    status?: string
    messageId?: string | null
    error?: string | null
    sentAt?: Date | string | null
  }

  export type EmailRecipientUncheckedCreateWithoutCampaignInput = {
    id?: number
    email: string
    name?: string | null
    company?: string | null
    status?: string
    messageId?: string | null
    error?: string | null
    sentAt?: Date | string | null
  }

  export type EmailRecipientCreateOrConnectWithoutCampaignInput = {
    where: EmailRecipientWhereUniqueInput
    create: XOR<EmailRecipientCreateWithoutCampaignInput, EmailRecipientUncheckedCreateWithoutCampaignInput>
  }

  export type EmailRecipientCreateManyCampaignInputEnvelope = {
    data: EmailRecipientCreateManyCampaignInput | EmailRecipientCreateManyCampaignInput[]
    skipDuplicates?: boolean
  }

  export type EmailTemplateUpsertWithoutCampaignsInput = {
    update: XOR<EmailTemplateUpdateWithoutCampaignsInput, EmailTemplateUncheckedUpdateWithoutCampaignsInput>
    create: XOR<EmailTemplateCreateWithoutCampaignsInput, EmailTemplateUncheckedCreateWithoutCampaignsInput>
    where?: EmailTemplateWhereInput
  }

  export type EmailTemplateUpdateToOneWithWhereWithoutCampaignsInput = {
    where?: EmailTemplateWhereInput
    data: XOR<EmailTemplateUpdateWithoutCampaignsInput, EmailTemplateUncheckedUpdateWithoutCampaignsInput>
  }

  export type EmailTemplateUpdateWithoutCampaignsInput = {
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailTemplateUncheckedUpdateWithoutCampaignsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailRecipientUpsertWithWhereUniqueWithoutCampaignInput = {
    where: EmailRecipientWhereUniqueInput
    update: XOR<EmailRecipientUpdateWithoutCampaignInput, EmailRecipientUncheckedUpdateWithoutCampaignInput>
    create: XOR<EmailRecipientCreateWithoutCampaignInput, EmailRecipientUncheckedCreateWithoutCampaignInput>
  }

  export type EmailRecipientUpdateWithWhereUniqueWithoutCampaignInput = {
    where: EmailRecipientWhereUniqueInput
    data: XOR<EmailRecipientUpdateWithoutCampaignInput, EmailRecipientUncheckedUpdateWithoutCampaignInput>
  }

  export type EmailRecipientUpdateManyWithWhereWithoutCampaignInput = {
    where: EmailRecipientScalarWhereInput
    data: XOR<EmailRecipientUpdateManyMutationInput, EmailRecipientUncheckedUpdateManyWithoutCampaignInput>
  }

  export type EmailRecipientScalarWhereInput = {
    AND?: EmailRecipientScalarWhereInput | EmailRecipientScalarWhereInput[]
    OR?: EmailRecipientScalarWhereInput[]
    NOT?: EmailRecipientScalarWhereInput | EmailRecipientScalarWhereInput[]
    id?: IntFilter<"EmailRecipient"> | number
    campaignId?: IntFilter<"EmailRecipient"> | number
    email?: StringFilter<"EmailRecipient"> | string
    name?: StringNullableFilter<"EmailRecipient"> | string | null
    company?: StringNullableFilter<"EmailRecipient"> | string | null
    status?: StringFilter<"EmailRecipient"> | string
    messageId?: StringNullableFilter<"EmailRecipient"> | string | null
    error?: StringNullableFilter<"EmailRecipient"> | string | null
    sentAt?: DateTimeNullableFilter<"EmailRecipient"> | Date | string | null
  }

  export type EmailCampaignCreateWithoutRecipientsInput = {
    name: string
    subject: string
    body: string
    status?: string
    sentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    template: EmailTemplateCreateNestedOneWithoutCampaignsInput
  }

  export type EmailCampaignUncheckedCreateWithoutRecipientsInput = {
    id?: number
    name: string
    templateId: number
    subject: string
    body: string
    status?: string
    sentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailCampaignCreateOrConnectWithoutRecipientsInput = {
    where: EmailCampaignWhereUniqueInput
    create: XOR<EmailCampaignCreateWithoutRecipientsInput, EmailCampaignUncheckedCreateWithoutRecipientsInput>
  }

  export type EmailCampaignUpsertWithoutRecipientsInput = {
    update: XOR<EmailCampaignUpdateWithoutRecipientsInput, EmailCampaignUncheckedUpdateWithoutRecipientsInput>
    create: XOR<EmailCampaignCreateWithoutRecipientsInput, EmailCampaignUncheckedCreateWithoutRecipientsInput>
    where?: EmailCampaignWhereInput
  }

  export type EmailCampaignUpdateToOneWithWhereWithoutRecipientsInput = {
    where?: EmailCampaignWhereInput
    data: XOR<EmailCampaignUpdateWithoutRecipientsInput, EmailCampaignUncheckedUpdateWithoutRecipientsInput>
  }

  export type EmailCampaignUpdateWithoutRecipientsInput = {
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: EmailTemplateUpdateOneRequiredWithoutCampaignsNestedInput
  }

  export type EmailCampaignUncheckedUpdateWithoutRecipientsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    templateId?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateManyOrganizerInput = {
    id?: number
    title: string
    source: $Enums.EventSource
    sourceUrl?: string | null
    category?: string | null
    hall?: string | null
    imageUrl?: string | null
    organizerName?: string | null
    organizerContactName?: string | null
    organizerPhone?: string | null
    organizerEmail?: string | null
    organizerWebsite?: string | null
    organizerFacebook?: string | null
    outreachStatus?: string
    startsAt: Date | string
    endsAt?: Date | string | null
    venueId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactActivityCreateManyOrganizerInput = {
    id?: number
    type?: string
    text: string
    createdAt?: Date | string
  }

  export type EventUpdateWithoutOrganizerInput = {
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUpdateOneRequiredWithoutEventsNestedInput
    leads?: LeadUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutOrganizerInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venueId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutOrganizerInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venueId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactActivityUpdateWithoutOrganizerInput = {
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactActivityUncheckedUpdateWithoutOrganizerInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactActivityUncheckedUpdateManyWithoutOrganizerInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateManyVenueInput = {
    id?: number
    title: string
    source: $Enums.EventSource
    sourceUrl?: string | null
    category?: string | null
    hall?: string | null
    imageUrl?: string | null
    organizerName?: string | null
    organizerContactName?: string | null
    organizerPhone?: string | null
    organizerEmail?: string | null
    organizerWebsite?: string | null
    organizerFacebook?: string | null
    outreachStatus?: string
    organizerId?: number | null
    startsAt: Date | string
    endsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUpdateWithoutVenueInput = {
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: OrganizerUpdateOneWithoutEventsNestedInput
    leads?: LeadUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutVenueInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    organizerId?: NullableIntFieldUpdateOperationsInput | number | null
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutVenueInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    source?: EnumEventSourceFieldUpdateOperationsInput | $Enums.EventSource
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    hall?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    organizerName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerContactName?: NullableStringFieldUpdateOperationsInput | string | null
    organizerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    organizerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    organizerWebsite?: NullableStringFieldUpdateOperationsInput | string | null
    organizerFacebook?: NullableStringFieldUpdateOperationsInput | string | null
    outreachStatus?: StringFieldUpdateOperationsInput | string
    organizerId?: NullableIntFieldUpdateOperationsInput | number | null
    startsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateManyEventInput = {
    id?: number
    companyName: string
    contactName?: string | null
    phone?: string | null
    email?: string | null
    status?: $Enums.LeadStatus
    priority?: $Enums.LeadPriority
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUpdateWithoutEventInput = {
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    priority?: EnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    priority?: EnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyName?: StringFieldUpdateOperationsInput | string
    contactName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    priority?: EnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateManyLeadInput = {
    id?: number
    title: string
    dueAt?: Date | string | null
    done?: boolean
    createdAt?: Date | string
  }

  export type ActivityUpdateWithoutLeadInput = {
    title?: StringFieldUpdateOperationsInput | string
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateWithoutLeadInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyWithoutLeadInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailCampaignCreateManyTemplateInput = {
    id?: number
    name: string
    subject: string
    body: string
    status?: string
    sentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailCampaignUpdateWithoutTemplateInput = {
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipients?: EmailRecipientUpdateManyWithoutCampaignNestedInput
  }

  export type EmailCampaignUncheckedUpdateWithoutTemplateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipients?: EmailRecipientUncheckedUpdateManyWithoutCampaignNestedInput
  }

  export type EmailCampaignUncheckedUpdateManyWithoutTemplateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailRecipientCreateManyCampaignInput = {
    id?: number
    email: string
    name?: string | null
    company?: string | null
    status?: string
    messageId?: string | null
    error?: string | null
    sentAt?: Date | string | null
  }

  export type EmailRecipientUpdateWithoutCampaignInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EmailRecipientUncheckedUpdateWithoutCampaignInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EmailRecipientUncheckedUpdateManyWithoutCampaignInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}