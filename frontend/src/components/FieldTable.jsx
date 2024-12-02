/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import Table from './GridTable';
import DebouncedInput from './DebouncedInput';
import EditTooltip from './EditTooltip';
import DeleteTooltip from './DeleteToolTip';
import formatDateString from '../hooks/formatDateString';
import imageIcon from './../assets/img/icons/business.png';
import { Link } from 'react-router-dom';
const BusinessTable = ({
	data,
	isLoading,
	handleDelete,
	handleEdit,
	handleAddField,
}) => {
	const [selectedStatus, setSelectedStatus] = useState('');
	const [globalFilter, setGlobalFilter] = useState('');
	const name = 'Fields';
	const columns = [
		{
			Header: 'Name',
			accessor: 'name',
			Cell: ({ row }) => {
				const product = row.original;
				return (
					<>
						<Link to={`/business/${product._id}`}>
							<img
								className="w-full object-cover"
								src={product?.image?.url || imageIcon}
								alt={product.name}
							/>
						</Link>
						<div className="absolute top-10 right-5 z-10">
							<div className="flex flex-col items-center justify-center space-y-2">
								<EditTooltip handleEdit={handleEdit} data={product} />
								<DeleteTooltip handleDelete={handleDelete} data={product} />
							</div>
						</div>
						<div className="px-5 py-5">
							<Link
								to={`/business/${product._id}`}
								className="text-lg font-normal text-heading text-hover-primary mb-2 inline-block leading-none"
							>
								{product.name}
							</Link>
							<div className="leading-none mb-2">
								<span className="text-base font-medium text-black">
									${product.price}
								</span>
								<p>{formatDateString(product.createdAt)}</p>
							</div>
						</div>
					</>
				);
			},
		},
	];
	const filteredData = useMemo(() => {
		if (selectedStatus === '') {
			return data;
		}
		return data.filter((items) => items.status === selectedStatus);
	}, [data, selectedStatus]);
	data = useMemo(() => filteredData, [filteredData]);
	return (
		<>
			<div className="tp-search-box flex items-center justify-between px-8 pb-4">
				<div className="search-input relative">
					<DebouncedInput
						className="input h-[44px] w-full pl-14"
						value={globalFilter ?? ''}
						onChange={(value) => setGlobalFilter(String(value))}
						type="text"
						placeholder="Search..."
					/>
					<button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
						<svg
							width="16"
							height="16"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								d="M18.9999 19L14.6499 14.65"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					</button>
				</div>
				<div className="flex justify-end space-x-6">
					<div className="search-select mr-3 flex items-center space-x-3 ">
						<span className="text-tiny inline-block leading-none -translate-y-[2px]">
							Status
						</span>
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
						>
							<option value="">Show All</option>
							<option value="active">Active</option>
							<option value="inActive">In Active</option>
							<option value="schedule">Scheduled</option>
							<option value="lowStock">Low Stock</option>
							<option value="outOfStock">Out of Stock</option>
						</select>
					</div>
					<div className="product-add-btn flex ">
						<button onClick={handleAddField} className="tp-btn">
							Add Field
						</button>
					</div>
				</div>
			</div>
			<Table
				data={data}
				columns={columns}
				globalFilter={globalFilter}
				pageSize={5}
				name={name}
				isLoading={isLoading}
			/>
		</>
	);
};

export default BusinessTable;
