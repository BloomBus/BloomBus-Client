//---------------
// Common types
//---------------
type PopoverPlacement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'right-start'
  | 'bottom-start'
  | 'left-start'
  | 'top-end'
  | 'right-end'
  | 'bottom-end'
  | 'left-end';

declare module 'calcite-react/Accordion' {
  interface AccordionProps extends React.HTMLProps<HTMLAsideElement> {
    activeSectionIndexes?: number[];
    iconPosition?: 'start' | 'end';
    onAccordionChange?: (e: React.SyntheticEvent, index: number) => void;
  }
  export default class Accordion extends React.Component<AccordionProps> {}

  export class AccordionSection extends React.Component {}
  export class AccordionTitle extends React.Component {}
  export class AccordionContent extends React.Component {}
}

declare module 'calcite-react/ActionBar' {
  type ActionBarProps = {
    collapseLabel?: string;
    collapsed: boolean;
    dark?: boolean;
    expandLabel?: string;
    onToggleCollapse?: () => void;
  };
  export default class ActionBar extends React.Component<ActionBarProps> {}

  interface ActionProps extends React.HTMLProps<HTMLButtonElement> {
    active: boolean;
    icon: React.ReactNode;
  }
  export class Action extends React.Component<ActionProps> {}
  export class ActionGroup extends React.Component {}
}

declare module 'calcite-react/Alert' {
  type AlertProps = {
    icon?: React.ReactNode;
    full?: boolean;
    red?: boolean;
    green?: boolean;
    yellow?: boolean;
    onClose?: () => void;
    showIcon?: boolean;
    showCloseLabel?: boolean;
    style?: React.CSSProperties;
  };
  export default class Alert extends React.Component<AlertProps> {}

  export class AlertTitle extends React.Component {}
  export class AlertMessage extends React.Component {}
}

declare module 'calcite-react/Alert/Alert-styled' {
  export const StyledAlert: CSSObject;
}

declare module 'calcite-react/ArcgisAccount' {
  interface ArcgisAccountProps {
    user: IUser;
    portal: IPortal;
    token?: string;
    switchAccountLabel?: string;
    signOutLabel?: string;
    onRequestSwitchAccount?: () => void;
    onRequestSignOut?: () => void;
  }
  export default class ArcgisAccount extends React.Component<ArcgisAccountProps> {}

  export class ArcgisAccountMenuItem extends React.Component<
    React.HTMLProps<HTMLAnchorElement>
  > {}
}
declare module 'calcite-react/ArcgisAccount/ArcgisAccount-styled' {
  export const StyledSignOutButton: CSSObject;
  export const StyledSwitchAccountButton: CSSObject;
}
declare module 'calcite-react/ArcgisItemCard' {
  interface ArcgisItemCardProps {
    /** The ArcGIS item used to populate the UI */
    item: IItem;
    /** Portal object - if not specified will default to ArcGIS Online */
    portal?: IPortal;
    /** Portal auth token */
    token: string;

    /** Whether the ArcgisItemCard should show a thumbnail or not */
    showThumbnail?: boolean;
    /** Style prop to position Card content vertically */
    vertical?: boolean;

    /** Whether the ArcgisItemCard shows an actions tab at the bottom or not */
    actions?: React.ReactNode;
    /** String source URL to serve as default image for invalid thumbnails */
    defaultThumbnailUrl?: string;
    /** Number of characters to use before truncating the description text */
    maxDescriptionLength?: number;

    /** Function to render custom elements or values in the item card title */
    customTitleRenderer?: (e: string) => void;
    /** A function that can be provided to customize the formatting of dates */
    dateFormatter?: (date: Date) => void;
  }
  export default class ArcgisItemCard extends React.Component<ArcgisItemCardProps> {}
}
declare module 'calcite-react/ArcgisItemCard/ArcgisItemCard-styled' {
  export const StyledItemCardImageWrap: CSSObject;
}

declare module 'calcite-react/ArcgisShare' {
  interface ArcgisShareProps {
    user: any;
    portal: any;
    sharing: any;
    onChange: (sharing: any) => void;
    hidePublicSharing: boolean;
    publicLabel: string;
    groupsLabel: string;
    noGroupsLabel: string;
  }
  export default class ArcgisShare extends React.Component<ArcgisShareProps> {}
}

declare module 'calcite-react/Avatar' {
  type AvatarProps = {
    style: Record<strint, string>;
  };
  export default class Avatar extends React.Component<AvatarProps> {}
}

declare module 'calcite-react/Avatar/Avatar-styled' {
  export const StyledAvatarText: CSSObject;
}

declare module 'calcite-react/Button' {
  interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    fullWidth?: boolean;

    // Icon
    icon?: React.ReactNode;
    iconButton?: boolean;
    iconPosition?: 'before' | 'after';

    // Styles
    red?: boolean;
    green?: boolean;
    white?: boolean;
    clear?: boolean;
    clearWhite?: boolean;
    halo?: boolean;
    inline?: boolean;
    transparent?: boolean;
    active?: boolean;

    // Sizes
    extraLarge?: boolean;
    large?: boolean;
    small?: boolean;
    extraSmall?: boolean;
    half?: boolean;
  }
  export default class Button extends React.Component<ButtonProps> {}

  interface ButtonGroupProps {
    isToggle?: boolean;
    style?: React.CSSProperties;
  }
  export class ButtonGroup extends React.Component<ButtonGroupProps> {}
}

declare module 'calcite-react/CalciteThemeProvider' {
  interface CalciteThemeProviderProps {
    theme?: Object;
  }
  export default class CalciteThemeProvider extends React.Component<CalciteThemeProviderProps> {}

  export const CalciteTheme: any;
  export const EsriColors: any;
}

declare module 'calcite-react/Card' {
  type CardProps = {
    selected?: boolean;
    onClick?: () => void;
    bar?: string;
    wide?: boolean;
  };
  export default class Card extends React.Component<CardProps> {}
  export class CardTitle extends React.Component {}
  export class CardImage extends React.Component<
    React.HTMLProps<HTMLImageElement>
  > {}
  export class CardContent extends React.Component {}
}

declare module 'calcite-react/Card/Card-styled' {
  export const StyledCard: CSSObject;
}

declare module 'calcite-react/Checkbox' {
  interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
    checked?: boolean;
    labelStyle?: React.CSSProperties;
    onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  export default class Checkbox extends React.Component<CheckboxProps> {}
}
declare module 'calcite-react/Checkbox/Checkbox-styled' {
  export const StyledDisplayCheckbox: CSSObject;
}

declare module 'calcite-react/CopyToClipboard' {
  type CopyToClipboardProps = {
    tooltip?: string;
    successTooltip?: string;
    copyValue: string;
  };
  export default class CopyToClipboard extends React.Component<CopyToClipboardProps> {}
}

declare module 'calcite-react/Drawer' {
  type DrawerProps = {
    active?: boolean;
    onRequestClose?: () => void;
  };
  export default class Drawer extends React.Component<DrawerProps> {}
}

declare module 'calcite-react/Elements' {
  export class CalciteA extends React.Component<
    React.HTMLProps<HTMLAnchorElement>
  > {}
  export class CalciteH1 extends React.Component<
    React.HTMLProps<HTMLHeadingElement>
  > {}
  export class CalciteH2 extends React.Component<
    React.HTMLProps<HTMLHeadingElement>
  > {}
  export class CalciteH3 extends React.Component<
    React.HTMLProps<HTMLHeadingElement>
  > {}
  export class CalciteH4 extends React.Component<
    React.HTMLProps<HTMLHeadingElement>
  > {}
  export class CalciteH5 extends React.Component<
    React.HTMLProps<HTMLHeadingElement>
  > {}
  export class CalciteH6 extends React.Component<
    React.HTMLProps<HTMLHeadingElement>
  > {}
  export class CalciteUl extends React.Component<
    React.HTMLProps<HTMLUListElement>
  > {}
  export class CalciteLi extends React.Component<
    React.HTMLProps<HTMLLIElement>
  > {}
  export class CalciteP extends React.Component<
    React.HTMLProps<HTMLParagraphElement>
  > {}
}

declare module 'calcite-react/Drawer' {
  interface DrawerProps extends React.HTMLProps<HTMLDivElement> {
    /** Whether the drawer is visible */
    active?: boolean;
    /** Display the drawer on the right side of the screen */
    right?: boolean;
    /** Width (in px) of the drawer nav. (Default: 280) */
    drawerWidth?: number;
    /** Styles passed to the DrawerNav sub-component */
    drawerNavStyle?: React.CSSProperties;
    /** Function called when the user clicks the overlay area of the drawer */
    onRequestClose?: () => void;
  }
  export default class Drawer extends React.Component<DrawerProps> {}
}

declare module 'calcite-react/Form' {
  interface FormProps extends React.HTMLProps<HTMLFormElement> {
    horizontal?: boolean;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  }
  export default class Form extends React.Component<FormProps> {}

  export class Legend extends React.Component {}

  interface FieldsetProps extends React.HTMLProps<HTMLFieldSetElement> {
    horizontal?: boolean;
  }
  export class Fieldset extends React.Component<FieldsetProps> {}

  type FormControlProps = {
    error?: boolean;
    success?: boolean;
    horizontal?: boolean;
    /**
     * Not documented and generally not recommended, but has been supported
     * for certain cases where the width is inherited, and is unlikely to be
     * deprecated at this point.
     */
    fullWidth?: boolean;
    noValidation?: boolean;
    style?: React.CSSProperties;
  };
  export class FormControl extends React.Component<FormControlProps> {}

  type FormControlLabelProps = {
    isSmall?: boolean;
  };
  export class FormControlLabel extends React.Component<FormControlLabelProps> {}

  interface FormHelperTextProps {
    /** The FormHelperText should display as an error. */
    error?: boolean;
    /** The FormHelperText should display as successful. */
    success?: boolean;
    style?: React.CSSProperties;
  }
  export class FormHelperText extends React.Component<FormHelperTextProps> {}
}

declare module 'calcite-react/Form/Form-styled' {
  export const StyledForm: CSSObject;
  export const StyledFormControl: CSSObject;
}

declare module 'calcite-react/Label' {
  interface LabelProps {
    blue?: boolean;
  }
  export default class Label extends React.Component<LabelProps> {}
}

declare module 'calcite-react/Label/Label-styled' {
  export const StyledLabel: CSSObject;
}

declare module 'calcite-react/List' {
  type ListProps = {
    minimal?: boolean;
    multiSelect?: boolean;
    nested?: boolean;
    open?: boolean;
    style?: React.CSSProperties;
  };
  export default class List extends React.Component<ListProps> {}

  interface ListItemProps extends React.HTMLProps<HTMLDivElement> {
    value?: string;
    leftNode?: React.ReactNode;
    rightNode?: React.ReactNode;
    active?: boolean;
    filterItem?: boolean;
    onClick?: () => void;
  }
  export class ListItem extends React.Component<ListItemProps> {}
  export class ListHeader extends React.Component {}
  export class ListItemTitle extends React.Component {}

  interface ListItemSubtitleProps {
    title?: string;
  }
  export class ListItemSubtitle extends React.Component<ListItemSubtitleProps> {}
}

declare module 'calcite-react/List/List-styled' {
  export const StyledList: CSSObject;
  export const StyledListItem: CSSObject;
  export const StyledListTitle: CSSObject;
}

declare module 'calcite-react/Loader' {
  interface LoaderProps extends React.HTMLProps<HTMLDivElement> {
    /** Relative size of the Loader component. Value must be greater than 0. A value of 1 results in a 50px height Loader */
    sizeRatio?: number;
    /** Text displayed below the loading bars. */
    text?: string;
    /** Hex color of the Loader bars. */
    color?: string;
    style?: React.CSSProperties;
  }
  export default class Loader extends React.Component<LoaderProps> {}
}

declare module 'calcite-react/Menu' {
  interface MenuProps extends React.HTMLProps<HTMLDivElement> {
    style?: React.CSSProperties;
  }
  export default class Menu extends React.Component<MenuProps> {}

  interface MenuItemProps extends React.HTMLProps<HTMLAnchorElement> {
    value?: string | number | boolean | null;
    subtitle?: string | number;
    href?: string;
    customProp?: any;
  }
  export class MenuItem extends React.Component<MenuItemProps> {}
}

declare module 'calcite-react/Menu/Menu-styled' {
  export const StyledMenuItemSubtitle: CSSObject;
}

declare module 'calcite-react/Modal' {
  interface ModalProps {
    /**
     * Element identifying the root of the app to allow contents to be hidden
     * while the modal is open.
     * Required for screen reader accessibility.
     */
    appElement: Element | null;
    noPadding?: boolean;
    open?: boolean;
    /** Indicates whether pressing the "Esc" key should call the onRequestClose prop */
    shouldCloseOnEsc?: boolean;
    /** Indicates whether clicking the overlay should call the onRequestClose prop */
    shouldCloseOnOverlayClick?: boolean;
    /** Toggles visiblity of the close icon button */
    showClose?: boolean;
    title?: JSX.Element | string;
    subtitle?: JSX.Element | string;
    actions?: React.ReactNode;
    secondaryActions?: React.ReactNode;
    contentStyles?: React.CSSProperties;
    dialogStyle?: React.CSSProperties;
    overlayStyle?: React.CSSProperties;
    /** Function that will be run after the Modal has opened */
    onAfterOpen?: () => void;
    /** Function that will be run when the Modal is requested to be closed (either by clicking on overlay or pressing ESC) */
    onRequestClose: () => void;
  }
  export default class Modal extends React.Component<ModalProps> {}

  export class ModalActions extends React.Component {}
}

declare module 'calcite-react/MultiSelect' {
  type Value = string | number | boolean | undefined | null;
  interface MultiSelectPropsProps extends React.HTMLProps<HTMLButtonElement> {
    selectedValues: Value[];
    onChange: (value: string[]) => void;
    fullWidth?: boolean;
    disable?: boolean;
    renderValue?: (values: React.Element[]) => string;
  }
  export default class MultiSelect extends React.Component<MultiSelectProps> {}
}

declare module 'calcite-react/Panel' {
  type PanelProps = {
    noBorder?: boolean;
    white?: boolean;
  };
  export default class Panel extends React.Component<PanelProps> {}

  export class PanelTitle extends React.Component {}
  export class PanelText extends React.Component {}
}
declare module 'calcite-react/Panel/Panel-styled' {
  export const StyledPanelText: CSSObject;
}

declare module 'calcite-react/Popover' {
  type PopoverProps = {
    appendToBody?: boolean;
    open: boolean;
    placement?: PopoverPlacement;
    targetEl?: React.ReactNode;
    targetContainerStyles?: React.CSSProperties;
    positionFixed?: boolean;
    onRequestClose: () => void;
    style?: React.CSSProperties;
  };
  export default class Popover extends React.Component<PopoverProps> {}
}
declare module 'calcite-react/Popover/Popover-styled' {
  export const StyledTargetWrapper: CSSObject;
}

declare module 'calcite-react/Radio' {
  interface RadioProps {
    defaultChecked?: boolean;
    value?: string;
    name?: string;
    disabled?: boolean;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
  }
  export default class Radio extends React.Component<RadioProps> {}
}

declare module 'calcite-react/Search' {
  interface SearchProps<I extends any>
    extends React.HTMLProps<HTMLInputElement> {
    fullWidth?: boolean;
    minimal?: boolean;
    inputRef?: (ref: any) => void;
    inputValue?: string;
    items?: I[];
    selectedItem: I;
  }
  export default class Search extends React.Component<SearchProps> {}
}

declare module 'calcite-react/Select' {
  type SelectValue = string | number | boolean | undefined | null;
  interface SelectProps extends React.HTMLProps<HTMLButtonElement> {
    selectedValue?: SelectValue;
    onChange: (value: SelectValue, item?: any) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    appendToBody?: boolean;
    autoSelect?: boolean;
    fullWidth?: boolean;
    filterable?: boolean;
    minimal?: boolean;
    placement?: PopoverPlacement;
    positionFixed?: boolean;
    virtualized?: boolean;
    menuStyle?: Record<string, unknown>;
    placeholder?: string;
    placement?: string;
    virtualizedMenuWidth?: number;
    style?: React.CSSProperties;
    // Cannot find docs on what is passed to renderValue
    renderValue?: (item: any) => string;
  }
  export default class Select extends React.Component<SelectProps> {}
}

declare module 'calcite-react/Select/Select-styled' {
  export const StyledSelectWrapper: CSSObject;
  export const StyledSelectButton: CSSObject;
}

declare module 'calcite-react/SideNav' {
  export default class SideNav extends React.Component {}

  export class SideNavTitle extends React.Component {}

  export class SideNavLink extends React.Component<
    React.HTMLProps<HTMLAnchorElement>
  > {}
}

declare module 'calcite-react/Slider' {
  interface SliderProps extends React.HTMLProps<HTMLInputElement> {
    value: number;
    min?: number;
    max?: number;
    step?: number;
  }
  export default class Slider extends React.Component<SliderProps> {}
}

declare module 'calcite-react/Stepper' {
  type StepperProps = {
    currentStep: number;
    vertical?: boolean;
  };
  export default class Stepper extends React.Component<StepperProps> {}

  type StepProps = {
    complete?: boolean;
    selectable?: boolean;
    onClick?: () => void;
  };
  export class Step extends React.Component<StepProps> {}

  export class StepTitle extends React.Component {}
  export class StepDescription extends React.Component {}
}

declare module 'calcite-react/Switch' {
  interface SwitchProps extends React.HTMLProps<HTMLInputElement> {
    /* Position of the label text in relation to the input. */
    labelPosition?: 'before' | 'after';
    /* Should use a red highlight color. */
    destructive?: boolean;
    /* Switch and label will take up the full width of the container */
    fullWidth?: boolean;
    /* Event called when the Switch value should be toggled */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  export default class Switch extends React.Component<SwitchProps> {}
}

declare module 'calcite-react/Switch/Switch-styled' {
  export const StyledSwitch: CSSObject;
  export const StyledSwitchTrack: CSSObject;
}

declare module 'calcite-react/Tabs' {
  interface TabsProps {
    activeTabIndex: number;
    style?: React.CSSProperties;
    onTabChange: (number: idx) => void;
  }
  export default class Tabs extends React.Component<TabsProps> {}

  interface TabNavProps {
    style?: React.CSSProperties;
  }
  export class TabNav extends React.Component<TabNavProps> {}

  interface TabContentsProps {
    style?: React.CSSProperties;
  }
  export class TabContents extends React.Component<TabContentsProps> {}

  export class TabSection extends React.Component {}
  export class TabTitle extends React.Component {}
}

declare module 'calcite-react/Table' {
  interface TableProps extends React.HTMLProps<HTMLTableElement> {
    justified?: boolean;
    noCol?: boolean;
    noRow?: boolean;
    noTable?: boolean;
  }
  export default class Table extends React.Component<TableProps> {}
  export class TableHeader extends React.Component {}
  export class TableHeaderRow extends React.Component {}

  interface TableHeaderCellProps
    extends React.HTMLProps<HTMLTableCellElement> {}
  export class TableHeaderCell extends React.Component<TableHeaderCellProps> {}

  export class TableBody extends React.Component {}
  interface TableRowProps {
    noCol?: boolean;
    noRow?: boolean;
    isNewRow?: boolean;
  }
  export class TableRow extends React.Component<TableRowProps> {}

  interface TableCellProps extends React.HTMLProps<HTMLTableCellElement> {
    missingInput?: boolean;
    colSpan?: number | string;
  }
  export class TableCell extends React.Component<TableCellProps> {}
}

declare module 'calcite-react/Table/Table-styled' {
  export const StyledTableRow: CSSObject;
  export const StyledTableCell: CSSObject;
}

declare module 'calcite-react/TextField' {
  interface TextFieldProps
    extends React.HTMLProps<HTMLInputElement>,
      React.HTMLProps<HTMLTextAreaElement> {
    fullWidth?: boolean;
    disabled?: boolean;
    minimal?: boolean;
    search?: boolean;
    placeholder?: string;
    type?: string;
    rows?: number;
    value?: string | number;
    error?: boolean | null;
    success?: boolean | null; // null allowed for overriding default
    leftAdornment?: React.ReactNode;
    rightAdornment?: React.ReactNode;
    rightAdornmentNoWrap?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRequestClear?: () => void;
    style?: CSSObject;
  }
  export default class TextField extends React.Component<TextFieldProps> {}
}

declare module 'calcite-react/Toaster' {
  /** See https://fkhadra.github.io/react-toastify/api/toast */
  interface NotifyProps {
    type?: 'error' | 'warning' | 'info' | 'success';
    position?:
      | 'top-right'
      | 'top-center'
      | 'top-left'
      | 'bottom-right'
      | 'bottom-center'
      | 'bottom-left';
    showIcon?: boolean;
    autoClose?: boolean | number;
    showProgress?: boolean;
  }

  /**
   * @returns ID for dismissing
   */
  export const notify = (
    content: string | React.ReactNode,
    options: NotifyProps
  ) => string;

  /** See react-toastify */
  export const toast: Toast;

  interface ToastContainerProps {
    /** Undocumented */
    rtl?: boolean;
    /** Undocumented */
    position?: NotifyProps['position'];
  }
  export class ToastContainer extends React.Component<ToastContainerProps> {}

  interface ToastMessageProps {
    style?: React.CSSProperties;
  }
  export class ToastMessage extends React.Component<ToastMessageProps> {}
}

declare module 'calcite-react/Tooltip' {
  type TooltipProps = {
    title?: React.ReactNode;
    placement?: PopoverPlacement;
    transitionDuration?: number;
    enterDelay?: number;
    open?: boolean;
    appendToBody?: boolean;
    positionFixed?: boolean;
    style?: React.CSSProperties;
    arrowStyle?: React.CSSProperties;
    targetWrapperStyle?: React.CSSProperties;
    popperModifiers?: any;
  };
  export default class Tooltip extends React.Component<TooltipProps> {}
}

declare module 'calcite-react/Tooltip/Tooltip-styled' {
  export const StyledTargetWrapper: CSSObject;
}

declare module 'calcite-react/TopNav' {
  interface TopNavProps {
    contentWidth?: string;
  }
  export default class TopNav extends React.Component<TopNavProps> {}

  export class TopNavActionsList extends React.Component {}

  export class TopNavBrand extends React.Component<
    React.HTMLProps<HTMLImageElement>
  > {}

  interface TopNavTitleProps {
    onClick?: () => void;
  }
  export class TopNavTitle extends React.Component<TopNavTitleProps> {}

  interface TopNavLinkProps extends React.HTMLProps<HTMLAnchorElement> {
    as?: React.ReactNode;
    to?:
      | ((location: string) => void)
      | { pathname: string; search: string }
      | string;
    end?: boolean;
  }
  export class TopNavLink extends React.Component<TopNavLinkProps> {}

  export class TopNavList extends React.Component {}
}

declare module 'calcite-react/TopNav/TopNav-styled' {
  export const StyledTopNav: CSSObject;
  export const StyledTopNavLink: CSSObject;
  export const StyledTopNavContainer: CSSObject;
}

declare module 'calcite-react/utils/helpers' {
  export const fontSize: (fontSize: number) => string;
  export const unitCalc: (number, number, string) => number;
}
