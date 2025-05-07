export interface Pagination<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * --------------------------------------------------------------------------
 *  Shared helpers
 * --------------------------------------------------------------------------
 */
export interface NamedAPIResource {
  name: string;
  url: string;
}

/**
 * --------------------------------------------------------------------------
 *  Abilities
 * --------------------------------------------------------------------------
 */
export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

/**
 * --------------------------------------------------------------------------
 *  Game indices
 * --------------------------------------------------------------------------
 */
export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

/**
 * --------------------------------------------------------------------------
 *  Moves
 * --------------------------------------------------------------------------
 */
export interface MoveVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  /** `null` whenever the order is not defined by PokeAPI */
  order: number | null;
  version_group: NamedAPIResource;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: MoveVersionGroupDetail[];
}

/**
 * --------------------------------------------------------------------------
 *  Stats & Types
 * --------------------------------------------------------------------------
 */
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

/**
 * --------------------------------------------------------------------------
 *  Cries
 * --------------------------------------------------------------------------
 */
export interface Cries {
  latest: string;
  legacy: string;
}

/**
 * --------------------------------------------------------------------------
 *  Sprites
 *  (PokeAPI goes *very* deep here.  For practical work we usually only need
 *  the top-level properties together with an index-signature for anything
 *  nested further down.)
 * --------------------------------------------------------------------------
 */
export interface SimpleSprite {
  back_default?: string | null;
  back_gray?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  back_transparent?: string | null;

  front_default?: string | null;
  front_gray?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
  front_transparent?: string | null;
}

export interface AnimatedSprite extends SimpleSprite {} // identical keys, different assets
export interface HomeSprite extends Omit<SimpleSprite, 'back_*' | 'front_gray' | 'front_transparent'> {}
export interface OfficialArtworkSprite {
  front_default: string | null;
  front_shiny: string | null;
}
export type IconSprite = Pick<SimpleSprite, 'front_default' | 'front_female'>;

export interface PokemonSprites extends SimpleSprite {
  other: {
    dream_world: Pick<SimpleSprite, 'front_default' | 'front_female'>;
    home: HomeSprite;
    'official-artwork': OfficialArtworkSprite;
    showdown: SimpleSprite & {
      animated?: AnimatedSprite;
    };
  };

  /**
   * All versions keyed by generation and game.
   *
   * E.g. `sprites.versions['generation-v']['black-white']`
   */
  versions: Record<
    /* generation-i .. generation-viii */ string,
    Record</* game/edition */ string, SimpleSprite | AnimatedSprite | IconSprite | HomeSprite | OfficialArtworkSprite>
  >;
}

/**
 * --------------------------------------------------------------------------
 *  The top-level response object
 * --------------------------------------------------------------------------
 */
export interface Pokemon {
  abilities: PokemonAbility[];
  base_experience: number;
  cries: Cries;
  forms: NamedAPIResource[];

  game_indices: VersionGameIndex[];

  height: number;
  held_items: unknown[]; // ──> replace with `PokemonHeldItem[]` if you need that branch
  id: number;
  is_default: boolean;
  location_area_encounters: string;

  moves: PokemonMove[];

  name: string;
  order: number;

  past_abilities: unknown[]; // empty for Metapod – add a real type when you need it
  past_types: unknown[]; // idem

  species: NamedAPIResource;
  sprites: PokemonSprites;

  stats: PokemonStat[];
  types: PokemonType[];

  weight: number;
}
