import { filters, services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform;

export interface ISelectFilterSettings<TDataType, TFilterType> {
	valueSelector: string | { (item: TDataType): any };
	comparer?: IEqualityFunction<TFilterType>;

	// component settings
	options?: any[];
	getOptions?: { (): angular.IPromise<any[]> };
	label?: string;
	displayNameSelector?: string | { (item: any): string };
	nullOption?: string;
}

export interface ISelectFilter<T> extends filters.IFilter {
	selectedValue: any;
}

export interface IEqualityFunction<TFilterType> {
	(item1: TFilterType, item2: TFilterType): boolean;
}

export class SelectFilter<TDataType, TFilterType> implements ISelectFilter<TDataType> {
	selectedValue: any;
	type: string = 'selectFilter';

	private valueSelector: string | { (item: TDataType): any };
	private comparer: IEqualityFunction<TFilterType>;

	// component settings
	options: any[];
	getOptions: { (): angular.IPromise<any[]> };
	label: string;
	displayNameSelector: string | { (item: any): string };
	nullOption: string;
	template: string;

	object: __object.IObjectUtility;
	transformService: __transform.ITransformService;

	constructor(settings: ISelectFilterSettings<TDataType, TFilterType>
			, object: __object.IObjectUtility
			, transformService: __transform.ITransformService) {
		this.object = object;
		this.transformService = transformService;

		this.valueSelector = settings.valueSelector;
		this.comparer = settings.comparer;
		this.options = settings.options;
		this.getOptions = settings.getOptions;
		this.label = settings.label;
		this.displayNameSelector = settings.displayNameSelector;
		this.nullOption = settings.nullOption;
		this.template = `<rl-select-filter filter="filter" source="dataSource" options="filter.options" get-options="filter.getOptions()"
										   label="{{filter.label}}" selector="filter.displayNameSelector" null-option="{{filter.nullOption}}"></rl-select-filter>`;
	}

	filter(item: TDataType): boolean {
		if (this.selectedValue == null) {
			return true;
		}

		if (this.comparer != null) {
			return this.comparer(this.getValue(item), this.selectedValue);
		}

		return this.object.areEqual(this.getValue(item), this.selectedValue);
	}

	private getValue(item: TDataType): any {
		return this.transformService.getValue(item, this.valueSelector);
	}

}
