interface INftMedia {
  mediaType?: string | null
  mediaUrl?: string
}

export interface INftMetadata {
  name: string
  description: string
  image: { DARK: string; LIGHT: string }
  link: string
  issued_at: string
  program?: string
  cohort?: string
  owner?: string
  id: string
  isAvatar?: boolean
  isAvatarBadge?: boolean
  source: 'ncd' | 'paras' | 'mintbase'
  contract: string
}

export interface INftMetaMedia extends INftMetadata, INftMedia { }

export interface ITokenMetadata {
  metadata: {
    title: string;
    description: string;
    media: string;
    issued_at: string;
    extra: string;
  };
  token_id: string;
}

export interface ParasResult {
  data: ParasData
}

interface ParasData {
  results: PResult[]
  skip:    number
  limit:   number
}

export interface PResult {
  _id:             string;
  contract_id:     string;
  token_id:        string;
  owner_id:        string;
  token_series_id: string;
  edition_id:      string;
  metadata:        Metadata;
  royalty:         Royalty;
  price:           null | string;
  categories:      Category[];
  approval_id?:    number;
  ft_token_id?:    string;
}

interface Category {
  name:        string;
  isPinned:    boolean;
  category_id: string;
}

interface Metadata {
  title:          string;
  description:    string;
  media:          string;
  media_hash:     null;
  copies:         number;
  issued_at:      string | null;
  expires_at:     null;
  starts_at:      null;
  updated_at:     null;
  extra:          null;
  reference:      string;
  reference_hash: null;
  collection:     string;
  collection_id:  string;
  creator_id:     string;
  blurhash:       string;
  attributes?:    Attribute[];
}

interface Attribute {
  trait_type: string;
  value:      string;
}

interface Royalty {
  [name: string]:    number;
}

interface IAccounts {
  testnetAccounts: string[]
  mainnetAccounts: string[]
}

export interface IDappState {
  username: string | null
  current: boolean
  theme: 'DARK' | 'LIGHT'
  avatarNft: INftMetaMedia | null
  avatarNftBadge: INftMetaMedia | null
  linkStateChanged: boolean
  accounts: IAccounts | null
}

export interface IDappletApi {
  connectWallet: () => Promise<string>
  isWalletConnected: () => Promise<boolean>
  getCurrentNearAccount: () => Promise<string>

  getExternalAccounts: (near: string) => Promise<string[]>
  getNearAccounts: (account: string) => Promise<string[]>
  addExternalAccount: (account: string) => Promise<void>
  removeExternalAccount: (account: string) => Promise<void>

  getNftId: (twitterAcc: string) => Promise<string[] | null>
  setNftId: (twitterAcc: string, id: string, source: string, contract: string) => Promise<void>
  removeNftId: (twitterAcc: string) => Promise<void>
  
  getNftBadgeId: (twitterAcc: string) => Promise<string[] | null>
  setNftBadgeId: (twitterAcc: string, id: string, source: string, contract: string) => Promise<void>
  removeNftBadgeId: (twitterAcc: string) => Promise<void>

  getNCDCertificates: (user: string) => Promise<INftMetadata[] | INftMetadata | undefined | null>
  getParasNFTs: (user: string, page: number, limit: number) => Promise<INftMetadata[] | undefined>
  getMintbaseNFTs: (user: string, page: number, limit: number) => Promise<INftMetadata[] | undefined>
  showNfts: (prevUser?: string) => Promise<void>

  afterLinking: () => Promise<void>
  afterAvatarChanging: () => Promise<void>
  afterAvatarBadgeChanging: () => Promise<void>
}
