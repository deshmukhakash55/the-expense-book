import PropTypes from 'prop-types';
import React, { useState } from 'react';

import AccordionDetails from '@material-ui/core/AccordionDetails';
import FilterListIcon from '@material-ui/icons/FilterList';

import { CssAccordion } from '../../utility/widgets';
import { CssAccordionSummary } from '../../utility/widgets';
import { CssFilterTextField } from '../../utility/widgets';
import { CssSwitch } from '../../utility/widgets';

import classes from './ExpenseFilter.module.css';

const ExpenseFilter = (props) => {
	const [isFilterInputOpened, setIsFilterInputOpened] = useState(false);

	return (
		<CssAccordion
			square
			expanded={isFilterInputOpened}
			onChange={() =>
				setIsFilterInputOpened(
					(prevIsFilterInputOpened) => !prevIsFilterInputOpened
				)
			}
		>
			<CssAccordionSummary>
				<div className={classes.FilterBlock}>
					<FilterListIcon />
					<div>Filter</div>
				</div>
			</CssAccordionSummary>
			<AccordionDetails>
				<div className={classes.FilterInputs}>
					<CssFilterTextField
						label="Search title"
						fullWidth
						type="search"
						value={props.filters.title}
						onChange={(event) =>
							props.setFilters((filters) => ({
								...filters,
								title: event.target.value
							}))
						}
					/>
					<div className={classes.DateTimeFilter}>
						<CssFilterTextField
							label="Start Date time"
							type="datetime-local"
							value={props.filters.startDate}
							InputLabelProps={{
								shrink: true
							}}
							onChange={(event) =>
								props.setFilters((filters) => ({
									...filters,
									startDate: event.target.value
								}))
							}
						/>
						<CssFilterTextField
							label="End Date time"
							type="datetime-local"
							value={props.filters.endDate}
							InputLabelProps={{
								shrink: true
							}}
							onChange={(event) =>
								props.setFilters((filters) => ({
									...filters,
									endDate: event.target.value
								}))
							}
						/>
					</div>
					<div>
						Only Bookmarked :
						<CssSwitch
							value={!!props.filters.bookmark}
							onChange={(event) =>
								props.setFilters((filters) => ({
									...filters,
									bookmark: event.target.checked
								}))
							}
						/>
					</div>
				</div>
			</AccordionDetails>
		</CssAccordion>
	);
};

ExpenseFilter.propTypes = {
	filters: PropTypes.shape({
		title: PropTypes.string,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		bookmark: PropTypes.bool
	}),
	setFilters: PropTypes.func
};

export default React.memo(ExpenseFilter);
