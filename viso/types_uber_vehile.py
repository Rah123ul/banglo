import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (14, 7)

# ============================================================
#   UBER BANGALORE - CLIENT VEHICLE PROFITABILITY ANALYSIS
#   Focused: UberXL | Uber Go | Go Sedan | Non-AC Taxi
# ============================================================

file_path = '/Users/rahulsingh/Desktop/banglo/viso/bangalore_ride_data.csv'   # ← Replace with your actual CSV path
df = pd.read_csv(file_path)

# ── FILTER ONLY CLIENT'S 4 VEHICLE TYPES ────────────────────
CLIENT_VEHICLES = ['UberXL', 'Uber Go', 'Go Sedan', 'Non-AC Taxi']

df_client = df[df['Vehicle Type'].isin(CLIENT_VEHICLES)].copy()

print("=" * 100)
print("  UBER BANGALORE — CLIENT VEHICLE PROFITABILITY ANALYSIS")
print("  Vehicles : UberXL | Uber Go | Go Sedan | Non-AC Taxi")
print("=" * 100)

print(f"\n📦 Total Records in Dataset      : {len(df):,}")
print(f"📦 Records for Client's Vehicles : {len(df_client):,}")
print(f"📦 Records Excluded (other types): {len(df) - len(df_client):,}")

# ── SEGMENT: SUCCESSFUL RIDES ONLY ──────────────────────────
success = df_client[df_client['Booking Status'] == 'Success'].copy()

# ============================================================
# 1. OVERALL SNAPSHOT — CLIENT'S FLEET
# ============================================================
print("\n" + "=" * 100)
print("1. OVERALL FLEET SNAPSHOT")
print("=" * 100)

total_bookings   = len(df_client)
total_success    = len(success)
success_rate     = total_success / total_bookings * 100
total_revenue    = success['Booking Value'].sum()
total_distance   = success['Ride Distance'].sum()
avg_fare         = success['Booking Value'].mean()
avg_distance     = success['Ride Distance'].mean()

print(f"""
  Total Bookings Attempted   : {total_bookings:,}
  Successful Rides           : {total_success:,}
  Overall Success Rate       : {success_rate:.2f}%
  Total Revenue (Successful) : ₹{total_revenue:,.2f}
  Average Fare per Ride      : ₹{avg_fare:.2f}
  Average Ride Distance      : {avg_distance:.2f} km
  Total Distance Covered     : {total_distance:,.2f} km
""")

# ============================================================
# 2. PER-VEHICLE REVENUE & RIDE METRICS
# ============================================================
print("=" * 100)
print("2. PER-VEHICLE TYPE — REVENUE & RIDE METRICS")
print("=" * 100)

vehicle_metrics = success.groupby('Vehicle Type').agg(
    Total_Revenue=('Booking Value', 'sum'),
    Avg_Fare=('Booking Value', 'mean'),
    Ride_Count=('Booking Value', 'count'),
    Total_Distance=('Ride Distance', 'sum'),
    Avg_Distance=('Ride Distance', 'mean'),
    Avg_Driver_Rating=('Driver Ratings', 'mean'),
    Avg_Customer_Rating=('Customer Ratings', 'mean'),
).round(2)

vehicle_metrics['Revenue_Share_%'] = (
    vehicle_metrics['Total_Revenue'] / vehicle_metrics['Total_Revenue'].sum() * 100
).round(2)
vehicle_metrics['Fare_per_KM'] = (
    vehicle_metrics['Total_Revenue'] / vehicle_metrics['Total_Distance']
).round(2)

vehicle_metrics = vehicle_metrics.sort_values('Total_Revenue', ascending=False)

print("\n", vehicle_metrics.to_string())

# ============================================================
# 3. BOOKING STATUS BREAKDOWN PER VEHICLE
# ============================================================
print("\n" + "=" * 100)
print("3. BOOKING STATUS BREAKDOWN PER VEHICLE")
print("=" * 100)

status_breakdown = df_client.groupby(['Vehicle Type', 'Booking Status']).size().unstack(fill_value=0)
status_breakdown['Total']        = status_breakdown.sum(axis=1)
status_breakdown['Success_Rate%'] = (
    status_breakdown.get('Success', 0) / status_breakdown['Total'] * 100
).round(2)
status_breakdown['Driver_Cancel%'] = (
    status_breakdown.get('Cancelled by Driver', 0) / status_breakdown['Total'] * 100
).round(2)
status_breakdown['Customer_Cancel%'] = (
    status_breakdown.get('Cancelled by Customer', 0) / status_breakdown['Total'] * 100
).round(2)
status_breakdown['Incomplete%'] = (
    status_breakdown.get('Incomplete', 0) / status_breakdown['Total'] * 100
).round(2)

print("\n", status_breakdown.to_string())

# Lost revenue per vehicle
print(f"\n💸 LOST REVENUE DUE TO CANCELLATIONS/INCOMPLETE — PER VEHICLE:")
failed = df_client[df_client['Booking Status'] != 'Success']
lost_rev = failed.groupby('Vehicle Type')['Booking Value'].sum().sort_values(ascending=False)
for vt, rev in lost_rev.items():
    print(f"   {vt:<15}: ₹{rev:>12,.2f} lost")

# ============================================================
# 4. CANCELLATION ROOT CAUSE — PER VEHICLE
# ============================================================
print("\n" + "=" * 100)
print("4. CANCELLATION ROOT CAUSE ANALYSIS — PER VEHICLE")
print("=" * 100)

for vt in CLIENT_VEHICLES:
    vdf = df_client[df_client['Vehicle Type'] == vt]
    print(f"\n  🚗 {vt}")
    dr = vdf['Cancelled Rides by Driver Reason'].value_counts()
    cr = vdf['Cancelled Rides by Customer Reason'].value_counts()
    ir = vdf['Incomplete Ride Reason'].value_counts()
    if not dr.empty:
        print(f"     Driver Cancellation Reasons   : {dict(dr)}")
    if not cr.empty:
        print(f"     Customer Cancellation Reasons : {dict(cr)}")
    if not ir.empty:
        print(f"     Incomplete Ride Reasons       : {dict(ir)}")

# ============================================================
# 5. CUSTOMER SATISFACTION — PER VEHICLE
# ============================================================
print("\n" + "=" * 100)
print("5. CUSTOMER SATISFACTION — PER VEHICLE")
print("=" * 100)

satisfaction = success.groupby('Vehicle Type').agg(
    Avg_Driver_Rating=('Driver Ratings', 'mean'),
    Avg_Customer_Rating=('Customer Ratings', 'mean'),
    Low_Driver_Ratings=('Driver Ratings', lambda x: (x < 3).sum()),
    Low_Customer_Ratings=('Customer Ratings', lambda x: (x < 3).sum()),
    Rated_Rides=('Driver Ratings', 'count'),
).round(2)
satisfaction['Low_Driver_%']   = (satisfaction['Low_Driver_Ratings'] / satisfaction['Rated_Rides'] * 100).round(2)
satisfaction['Low_Customer_%'] = (satisfaction['Low_Customer_Ratings'] / satisfaction['Rated_Rides'] * 100).round(2)

print("\n", satisfaction.to_string())

# ============================================================
# 6. PEAK HOUR ANALYSIS — PER VEHICLE
# ============================================================
print("\n" + "=" * 100)
print("6. PEAK HOUR REVENUE ANALYSIS — PER VEHICLE")
print("=" * 100)

success['Hour'] = pd.to_datetime(success['Time']).dt.hour

for vt in CLIENT_VEHICLES:
    vdf = success[success['Vehicle Type'] == vt]
    peak = vdf.groupby('Hour')['Booking Value'].sum().nlargest(3)
    peak_hours = ', '.join([f"{h}:00 (₹{v:,.0f})" for h, v in peak.items()])
    print(f"  🕐 {vt:<15}: Top 3 Peak Hours → {peak_hours}")

# ============================================================
# 7. TOP PROFITABLE LOCATIONS — PER VEHICLE
# ============================================================
print("\n" + "=" * 100)
print("7. TOP 5 PICKUP HOTSPOTS — PER VEHICLE")
print("=" * 100)

for vt in CLIENT_VEHICLES:
    vdf = success[success['Vehicle Type'] == vt]
    top5 = vdf['Pickup Location'].value_counts().head(5)
    print(f"\n  📍 {vt}")
    for loc, cnt in top5.items():
        rev = vdf[vdf['Pickup Location'] == loc]['Booking Value'].sum()
        print(f"     {loc:<25} — {cnt:>4} rides | ₹{rev:>10,.2f} revenue")

# ============================================================
# 8. PROFITABILITY ESTIMATION — PER VEHICLE TYPE
# ============================================================
print("\n" + "=" * 100)
print("8. PROFITABILITY ESTIMATION — PER VEHICLE TYPE")
print("=" * 100)

# Cost assumptions per vehicle type (realistic Bangalore estimates)
cost_config = {
    'UberXL': {
        'commission': 0.25,   # Uber takes 25%
        'fuel_per_km': 9.0,   # Higher fuel cost (bigger SUV)
        'maintenance_per_km': 3.0,
        'incentive_rate': 0.10
    },
    'Uber Go': {
        'commission': 0.25,
        'fuel_per_km': 6.5,   # Small hatchback
        'maintenance_per_km': 2.0,
        'incentive_rate': 0.10
    },
    'Go Sedan': {
        'commission': 0.25,
        'fuel_per_km': 7.5,   # Mid-size sedan
        'maintenance_per_km': 2.5,
        'incentive_rate': 0.10
    },
    'Non-AC Taxi': {
        'commission': 0.20,   # Lower commission tier
        'fuel_per_km': 6.0,   # Older vehicle, cheaper fuel
        'maintenance_per_km': 2.5,
        'incentive_rate': 0.08
    }
}

profitability_results = []

print(f"\n{'Vehicle':<15} {'Revenue':>14} {'Commission':>12} {'Fuel':>12} {'Maint':>10} {'Incentive':>12} {'Net Profit':>14} {'Margin%':>9}")
print("-" * 102)

for vt in CLIENT_VEHICLES:
    vdf = success[success['Vehicle Type'] == vt]
    cfg = cost_config[vt]

    rev         = vdf['Booking Value'].sum()
    dist        = vdf['Ride Distance'].sum()
    commission  = rev  * cfg['commission']
    fuel        = dist * cfg['fuel_per_km']
    maintenance = dist * cfg['maintenance_per_km']
    incentive   = rev  * cfg['incentive_rate']
    total_cost  = commission + fuel + maintenance + incentive
    net_profit  = rev - total_cost
    margin      = net_profit / rev * 100 if rev > 0 else 0
    profit_ride = net_profit / len(vdf) if len(vdf) > 0 else 0

    profitability_results.append({
        'Vehicle Type'    : vt,
        'Revenue'         : rev,
        'Commission'      : commission,
        'Fuel Cost'       : fuel,
        'Maintenance'     : maintenance,
        'Incentive'       : incentive,
        'Total Cost'      : total_cost,
        'Net Profit'      : net_profit,
        'Profit Margin %' : round(margin, 2),
        'Profit per Ride' : round(profit_ride, 2),
    })

    print(f"{vt:<15} ₹{rev:>13,.2f} ₹{commission:>11,.2f} ₹{fuel:>11,.2f} ₹{maintenance:>9,.2f} ₹{incentive:>11,.2f} ₹{net_profit:>13,.2f} {margin:>8.2f}%")

profit_df = pd.DataFrame(profitability_results).set_index('Vehicle Type')

print("\n\n  📊 PROFIT PER RIDE — PER VEHICLE:")
for _, row in profit_df.iterrows():
    print(f"     {row.name:<15}: ₹{row['Profit per Ride']:>8.2f} per ride")

# ============================================================
# 9. VEHICLE SCORING & FINAL VERDICT
# ============================================================
print("\n" + "=" * 100)
print("9. VEHICLE SCORING & FINAL DECISION")
print("=" * 100)

MEDAL = {0: '🥇', 1: '🥈', 2: '🥉', 3: ''}

scores = {}
for _, row in profit_df.iterrows():
    vt = row.name
    s_rate = status_breakdown.loc[vt, 'Success_Rate%'] if vt in status_breakdown.index else 0
    d_rate = satisfaction.loc[vt, 'Avg_Driver_Rating'] if vt in satisfaction.index else 0
    c_rate = satisfaction.loc[vt, 'Avg_Customer_Rating'] if vt in satisfaction.index else 0
    margin = row['Profit Margin %']

    score = 0
    score += 30 if margin > 20 else (20 if margin > 15 else (10 if margin > 10 else 5))
    score += 25 if s_rate > 70 else (15 if s_rate > 60 else (8 if s_rate > 50 else 3))
    score += 20 if d_rate >= 3.5 else (12 if d_rate >= 3.0 else 5)
    score += 15 if c_rate >= 3.5 else (10 if c_rate >= 3.0 else 5)
    score += 10 if row['Revenue'] > profit_df['Revenue'].mean() else 5
    scores[vt] = score

ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)

print(f"\n  {'Rank':<6} {'Vehicle':<16} {'Score /100':<12} {'Margin %':<12} {'Success %':<12} {'Verdict'}")
print("  " + "-" * 78)
for i, (vt, sc) in enumerate(ranked):
    margin = profit_df.loc[vt, 'Profit Margin %']
    s_rate = status_breakdown.loc[vt, 'Success_Rate%'] if vt in status_breakdown.index else 0
    medal  = MEDAL.get(i, '')

    if sc >= 70:
        verdict = "✅ HIGHLY PROFITABLE — DEPLOY"
    elif sc >= 50:
        verdict = "⚠️  PROFITABLE — IMPROVE OPS"
    elif sc >= 35:
        verdict = "🔶 MARGINAL — FIX ISSUES FIRST"
    else:
        verdict = "❌ LOW RETURN — RECONSIDER"

    print(f"  {medal} #{i+1:<4} {vt:<16} {sc:<12} {margin:<12.2f} {s_rate:<12.2f} {verdict}")

# ── Best vehicle overall ────────────────────────────────────
best_vehicle = ranked[0][0]
print(f"\n  🏆 BEST VEHICLE TO OPERATE IN BANGALORE: {best_vehicle} (Score: {ranked[0][1]}/100)")

# ============================================================
# 10. VISUALIZATIONS
# ============================================================
print("\n📊 Generating dashboard...")

COLORS = {
    'UberXL'     : '#1f77b4',
    'Uber Go'    : '#ff7f0e',
    'Go Sedan'   : '#2ca02c',
    'Non-AC Taxi': '#d62728'
}
color_list = [COLORS[v] for v in profit_df.index]

fig = plt.figure(figsize=(22, 14))
fig.suptitle('Uber Bangalore — Client Vehicle Profitability Dashboard', fontsize=18, fontweight='bold', y=1.01)
gs = gridspec.GridSpec(3, 3, figure=fig, hspace=0.45, wspace=0.35)

# ── Chart 1: Revenue Comparison ──────────────────────────────
ax1 = fig.add_subplot(gs[0, 0])
bars = ax1.bar(profit_df.index, profit_df['Revenue'] / 1e6, color=color_list, edgecolor='white', linewidth=1.2)
ax1.set_title('Total Revenue (₹ Million)', fontweight='bold')
ax1.set_ylabel('₹ Million')
ax1.tick_params(axis='x', rotation=20)
for bar, val in zip(bars, profit_df['Revenue'] / 1e6):
    ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.02, f'₹{val:.2f}M', ha='center', va='bottom', fontsize=9)

# ── Chart 2: Net Profit Comparison ───────────────────────────
ax2 = fig.add_subplot(gs[0, 1])
profit_colors = ['#2ecc71' if p > 0 else '#e74c3c' for p in profit_df['Net Profit']]
bars2 = ax2.bar(profit_df.index, profit_df['Net Profit'] / 1e6, color=profit_colors, edgecolor='white', linewidth=1.2)
ax2.set_title('Net Profit (₹ Million)', fontweight='bold')
ax2.set_ylabel('₹ Million')
ax2.tick_params(axis='x', rotation=20)
ax2.axhline(0, color='black', linewidth=0.8, linestyle='--')
for bar, val in zip(bars2, profit_df['Net Profit'] / 1e6):
    ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01, f'₹{val:.2f}M', ha='center', va='bottom', fontsize=9)

# ── Chart 3: Profit Margin % ─────────────────────────────────
ax3 = fig.add_subplot(gs[0, 2])
ax3.barh(profit_df.index, profit_df['Profit Margin %'], color=color_list, edgecolor='white', linewidth=1.2)
ax3.axvline(15, color='green', linestyle='--', linewidth=1.2, label='Target 15%')
ax3.axvline(10, color='orange', linestyle='--', linewidth=1.2, label='Minimum 10%')
ax3.set_title('Profit Margin %', fontweight='bold')
ax3.set_xlabel('Margin %')
ax3.legend(fontsize=8)
for i, (idx, val) in enumerate(profit_df['Profit Margin %'].items()):
    ax3.text(val + 0.2, i, f'{val:.1f}%', va='center', fontsize=9)

# ── Chart 4: Booking Status Stacked Bar ──────────────────────
ax4 = fig.add_subplot(gs[1, 0])
plot_cols  = [c for c in ['Success', 'Cancelled by Driver', 'Cancelled by Customer', 'Incomplete'] if c in status_breakdown.columns]
status_pct = status_breakdown[plot_cols].div(status_breakdown['Total'], axis=0) * 100
bar_colors = ['#2ecc71', '#e74c3c', '#f39c12', '#e67e22'][:len(plot_cols)]
status_pct.plot(kind='bar', stacked=True, ax=ax4, color=bar_colors, edgecolor='white', linewidth=0.6)
ax4.set_title('Booking Status Distribution %', fontweight='bold')
ax4.set_ylabel('%')
ax4.set_xlabel('')
ax4.tick_params(axis='x', rotation=20)
ax4.legend(fontsize=7, loc='lower right')

# ── Chart 5: Rating Comparison ───────────────────────────────
ax5 = fig.add_subplot(gs[1, 1])
x   = np.arange(len(CLIENT_VEHICLES))
w   = 0.35
ax5.bar(x - w/2, satisfaction['Avg_Driver_Rating'], width=w, label='Driver Rating', color='#3498db', edgecolor='white')
ax5.bar(x + w/2, satisfaction['Avg_Customer_Rating'], width=w, label='Customer Rating', color='#9b59b6', edgecolor='white')
ax5.axhline(3.5, color='green', linestyle='--', linewidth=1, label='Good (3.5)')
ax5.set_title('Average Ratings per Vehicle', fontweight='bold')
ax5.set_ylabel('Rating / 5')
ax5.set_xticks(x)
ax5.set_xticklabels(CLIENT_VEHICLES, rotation=20)
ax5.set_ylim(0, 5.5)
ax5.legend(fontsize=8)

# ── Chart 6: Profit per Ride ─────────────────────────────────
ax6 = fig.add_subplot(gs[1, 2])
bars6 = ax6.bar(profit_df.index, profit_df['Profit per Ride'], color=color_list, edgecolor='white', linewidth=1.2)
ax6.set_title('Profit per Ride (₹)', fontweight='bold')
ax6.set_ylabel('₹ per Ride')
ax6.tick_params(axis='x', rotation=20)
for bar, val in zip(bars6, profit_df['Profit per Ride']):
    ax6.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3, f'₹{val:.1f}', ha='center', va='bottom', fontsize=9)

# ── Chart 7: Hourly Revenue Trend — all 4 vehicles ───────────
ax7 = fig.add_subplot(gs[2, :2])
for vt in CLIENT_VEHICLES:
    hourly = success[success['Vehicle Type'] == vt].groupby('Hour')['Booking Value'].sum()
    ax7.plot(hourly.index, hourly.values, marker='o', linewidth=2, label=vt, color=COLORS[vt], markersize=4)
ax7.set_title('Revenue by Hour of Day — All Vehicle Types', fontweight='bold')
ax7.set_xlabel('Hour of Day')
ax7.set_ylabel('Revenue (₹)')
ax7.legend(fontsize=9)
ax7.grid(True, alpha=0.3)

# ── Chart 8: Profitability Score Card ────────────────────────
ax8 = fig.add_subplot(gs[2, 2])
score_vals  = [scores[v] for v in [r[0] for r in ranked]]
score_veh   = [r[0] for r in ranked]
score_clrs  = [COLORS[v] for v in score_veh]
bars8 = ax8.barh(score_veh, score_vals, color=score_clrs, edgecolor='white', linewidth=1.2)
ax8.axvline(70, color='green', linestyle='--', linewidth=1.2, label='High (70)')
ax8.axvline(50, color='orange', linestyle='--', linewidth=1.2, label='OK (50)')
ax8.set_title('Profitability Score / 100', fontweight='bold')
ax8.set_xlabel('Score')
ax8.set_xlim(0, 105)
ax8.legend(fontsize=8)
for bar, val in zip(bars8, score_vals):
    ax8.text(val + 1, bar.get_y() + bar.get_height()/2, f'{val}', va='center', fontsize=10, fontweight='bold')

plt.savefig('uber_4vehicle_dashboard.png', dpi=180, bbox_inches='tight')
print("✅ Dashboard saved as 'uber_4vehicle_dashboard.png'")

# ============================================================
# 11. EXPORT REPORTS
# ============================================================
print("\n💾 Saving reports...")

profit_df.to_csv('vehicle_profitability_report.csv')
status_breakdown.to_csv('vehicle_status_breakdown.csv')
satisfaction.to_csv('vehicle_satisfaction_report.csv')

# Master summary
summary_rows = []
for vt, sc in ranked:
    row = profit_df.loc[vt]
    s_r = status_breakdown.loc[vt, 'Success_Rate%'] if vt in status_breakdown.index else 0
    summary_rows.append({
        'Rank'           : [r[0] for r in ranked].index(vt) + 1,
        'Vehicle Type'   : vt,
        'Score /100'     : sc,
        'Revenue ₹'      : round(row['Revenue'], 2),
        'Net Profit ₹'   : round(row['Net Profit'], 2),
        'Profit Margin %': row['Profit Margin %'],
        'Profit/Ride ₹'  : row['Profit per Ride'],
        'Success Rate %' : round(s_r, 2),
        'Driver Rating'  : round(satisfaction.loc[vt, 'Avg_Driver_Rating'], 2) if vt in satisfaction.index else 'N/A',
        'Customer Rating': round(satisfaction.loc[vt, 'Avg_Customer_Rating'], 2) if vt in satisfaction.index else 'N/A',
    })

pd.DataFrame(summary_rows).to_csv('client_vehicle_summary.csv', index=False)

print("✅ Saved: vehicle_profitability_report.csv")
print("✅ Saved: vehicle_status_breakdown.csv")
print("✅ Saved: vehicle_satisfaction_report.csv")
print("✅ Saved: client_vehicle_summary.csv  ← Share this with client")

print("\n" + "=" * 100)
print("  FINAL CLIENT RECOMMENDATION")
print("=" * 100)
for i, (vt, sc) in enumerate(ranked):
    medal  = MEDAL.get(i, '')
    margin = profit_df.loc[vt, 'Profit Margin %']
    ppr    = profit_df.loc[vt, 'Profit per Ride']
    print(f"\n  {medal} {vt} (Score {sc}/100) | Margin: {margin:.2f}% | ₹{ppr:.2f}/ride")
    if sc >= 70:
        print(f"     → ✅ DEPLOY IMMEDIATELY — Strong revenue & good margins")
    elif sc >= 50:
        print(f"     → ⚠️  DEPLOY WITH CAUTION — Fix driver cancellations & improve ratings")
    elif sc >= 35:
        print(f"     → 🔶 HOLD — Address operational issues before scaling up")
    else:
        print(f"     → ❌ RECONSIDER — Low return for effort; review cost structure")

print("\n" + "=" * 100)
print("  ANALYSIS COMPLETE — Share dashboard + summary CSV with your client!")
print("=" * 100)